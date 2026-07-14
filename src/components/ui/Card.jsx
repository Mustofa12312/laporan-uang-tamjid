import { clsx } from 'clsx'
import { motion } from 'framer-motion'

export default function Card({
  children,
  className = '',
  hover = false,
  padding = true,
  onClick,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={clsx(
        'card-base',
        hover && 'card-hover cursor-pointer',
        padding && 'p-5',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  )
}
