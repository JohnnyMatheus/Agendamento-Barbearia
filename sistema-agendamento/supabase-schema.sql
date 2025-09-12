-- Tables
create table if not exists barbers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  created_at timestamptz default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price_cents int not null check (price_cents >= 0),
  duration_min int not null check (duration_min > 0),
  created_at timestamptz default now()
);

create table if not exists working_hours (
  id uuid primary key default gen_random_uuid(),
  barber_id uuid references barbers(id) on delete cascade,
  weekday int not null check (weekday between 0 and 6), -- 0 domingo
  start_time time not null,
  end_time time not null
);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  barber_id uuid references barbers(id) on delete set null,
  service_id uuid references services(id) on delete restrict,
  customer_name text not null,
  customer_email text not null,
  start_at timestamptz not null,
  end_at timestamptz not null,
  price_cents int not null,
  status text not null default 'confirmed'
);

-- View for dashboard
create or replace view appointments_view as
  select a.id, a.customer_name, a.customer_email, a.start_at, a.end_at, a.price_cents,
         s.name as service_name, a.status
  from appointments a
  join services s on s.id = a.service_id;

-- Helper: generate slots based on working hours and existing appointments
create or replace function get_available_slots(p_service_id uuid, p_date date)
returns table (start_time text, end_time text, is_available boolean)
language sql stable as $$
  with params as (
    select duration_min from services where id = p_service_id
  ), wh as (
    select * from working_hours wh
    where wh.weekday = extract(dow from p_date)
    limit 1
  ), timeline as (
    select generate_series(
      (p_date + wh.start_time)::timestamptz,
      (p_date + wh.end_time)::timestamptz - make_interval(mins => (select duration_min from params)),
      make_interval(mins => (select duration_min from params))
    ) as start_ts
    from wh
  ), occupied as (
    select start_at, end_at from appointments
    where start_at::date = p_date
  )
  select to_char(t.start_ts, 'HH24:MI') as start_time,
         to_char(t.start_ts + make_interval(mins => (select duration_min from params)), 'HH24:MI') as end_time,
         not exists (
           select 1 from occupied o
           where tstzrange(o.start_at, o.end_at, '[)') && tstzrange(t.start_ts, t.start_ts + make_interval(mins => (select duration_min from params)), '[)')
         ) as is_available
  from timeline t
  order by 1;
$$;

-- Safe create appointment
create or replace function create_appointment_safe(
  p_customer_name text,
  p_customer_email text,
  p_service_id uuid,
  p_date date,
  p_time text
) returns void
language plpgsql as $$
declare
  v_duration int;
  v_start timestamptz;
  v_end timestamptz;
  v_price int;
begin
  select duration_min, price_cents into v_duration, v_price from services where id = p_service_id;
  v_start := (p_date::timestamptz + make_interval(hours => split_part(p_time, ':', 1)::int, mins => split_part(p_time, ':', 2)::int));
  v_end := v_start + make_interval(mins => v_duration);

  if exists (
    select 1 from appointments a
    where tstzrange(a.start_at, a.end_at, '[)') && tstzrange(v_start, v_end, '[)')
  ) then
    raise exception 'Horário indisponível';
  end if;

  insert into appointments (barber_id, service_id, customer_name, customer_email, start_at, end_at, price_cents)
  values ((select id from barbers limit 1), p_service_id, p_customer_name, p_customer_email, v_start, v_end, v_price);
end;
$$;

-- Dashboard aggregator
create or replace function dashboard_today()
returns json language plpgsql as $$
declare
  v_today date := now()::date;
  v_today_count int;
  v_all_count int;
  v_revenue int;
  v_list json;
begin
  select count(*) into v_today_count from appointments where start_at::date = v_today;
  select count(*) into v_all_count from appointments;
  select coalesce(sum(price_cents),0) into v_revenue from appointments where start_at::date >= v_today - 6;
  select json_agg(row_to_json(x)) into v_list from (
    select a.id, a.customer_name, s.name as service_name, a.start_at
    from appointments a join services s on s.id = a.service_id
    where a.start_at::date = v_today order by a.start_at
  ) x;
  return json_build_object('today_count', v_today_count, 'all_count', v_all_count, 'revenue_cents', v_revenue, 'appointments', v_list);
end;
$$;


