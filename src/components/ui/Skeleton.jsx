import { clsx } from 'clsx'

export function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={clsx(
        'animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700',
        className
      )}
      {...props}
    />
  )
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={clsx('card-base p-5 space-y-3', className)}>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-3 w-20" />
    </div>
  )
}

export function SkeletonTable({ rows = 5, cols = 6 }) {
  return (
    <div className="space-y-2">
      <div className="flex gap-4 pb-2">
        {Array(cols).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {Array(rows).fill(0).map((_, r) => (
        <div key={r} className="flex gap-4 py-2">
          {Array(cols).fill(0).map((_, c) => (
            <Skeleton key={c} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

export function SkeletonChart({ className = '' }) {
  return (
    <div className={clsx('card-base p-5', className)}>
      <Skeleton className="h-4 w-32 mb-4" />
      <div className="flex items-end gap-2 h-40">
        {[60, 80, 45, 90, 70, 85, 50, 95, 65, 75].map((h, i) => (
          <Skeleton key={i} className="flex-1" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  )
}
