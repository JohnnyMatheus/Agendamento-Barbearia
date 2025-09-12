import React from "react";

export function BarberCardSkeleton() {
  return (
    <div className="bg-card rounded-lg p-6 border border-border animate-pulse">
      <div className="bg-muted h-48 rounded-lg mb-4"></div>
      <div className="space-y-2">
        <div className="bg-muted h-4 rounded w-3/4"></div>
        <div className="bg-muted h-3 rounded w-1/2"></div>
        <div className="bg-muted h-3 rounded w-1/4"></div>
      </div>
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="bg-card rounded-lg p-6 border border-border animate-pulse">
      <div className="bg-muted h-4 rounded w-1/3 mb-3"></div>
      <div className="space-y-2 mb-4">
        <div className="bg-muted h-4 rounded w-3/4"></div>
        <div className="bg-muted h-3 rounded w-full"></div>
        <div className="bg-muted h-3 rounded w-2/3"></div>
      </div>
      <div className="flex justify-between items-center">
        <div className="bg-muted h-6 rounded w-16"></div>
        <div className="bg-muted h-4 rounded w-12"></div>
      </div>
    </div>
  );
}

export function AppointmentCardSkeleton() {
  return (
    <div className="bg-card rounded-lg p-6 border border-border animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <div className="bg-muted h-4 rounded w-32"></div>
          <div className="bg-muted h-3 rounded w-24"></div>
        </div>
        <div className="bg-muted h-6 rounded w-20"></div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-muted h-4 rounded w-4"></div>
        <div className="bg-muted h-4 rounded w-20"></div>
        <div className="bg-muted h-4 rounded w-4"></div>
        <div className="bg-muted h-4 rounded w-16"></div>
      </div>
      <div className="flex gap-2">
        <div className="bg-muted h-8 rounded flex-1"></div>
        <div className="bg-muted h-8 rounded flex-1"></div>
      </div>
    </div>
  );
}

export function BookingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Progress Bar Skeleton */}
      <div className="flex items-center justify-between">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center">
            <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
            {i < 4 && <div className="w-16 h-1 bg-muted mx-2 animate-pulse" />}
          </div>
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-card rounded-lg p-6 border border-border animate-pulse"
          >
            <div className="bg-muted h-48 rounded-lg mb-4" />
            <div className="space-y-2">
              <div className="bg-muted h-4 rounded w-3/4" />
              <div className="bg-muted h-3 rounded w-1/2" />
              <div className="bg-muted h-3 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
