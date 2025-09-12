import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-client";

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  const { data, error } = await supabase
    .from("appointments_view")
    .select("*")
    .gte("start_at::date", date ?? new Date().toISOString().slice(0, 10))
    .order("start_at");
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { error } = await supabase.rpc("create_appointment_safe", body);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
