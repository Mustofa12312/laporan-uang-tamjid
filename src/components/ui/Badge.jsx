import { clsx } from 'clsx'

const variants = {
  primary: 'badge-primary',
  success: 'badge-success',
  warning: 'badge-warning',
  danger: 'badge-danger',
  neutral: 'badge bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
}

export default function Badge({ children, variant = 'primary', className = '' }) {
  return (
    <span className={clsx(variants[variant], className)}>
      {children}
    </span>
  )
}
