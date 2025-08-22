'use client'

import React from 'react'
import { cn } from '@/src/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react'

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error' | 'emergency'
  title?: string
  message: string
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  message,
  dismissible = false,
  onDismiss,
  className,
  icon,
  action,
}) => {
  const [isVisible, setIsVisible] = React.useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => {
      onDismiss?.()
    }, 300)
  }

  const types = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-950/30',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-300',
      icon: <Info className="w-5 h-5" />,
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-950/30',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-800 dark:text-green-300',
      icon: <CheckCircle className="w-5 h-5" />,
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      border: 'border-amber-200 dark:border-amber-800',
      text: 'text-amber-800 dark:text-amber-300',
      icon: <AlertTriangle className="w-5 h-5" />,
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-950/30',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-300',
      icon: <AlertCircle className="w-5 h-5" />,
    },
    emergency: {
      bg: 'bg-red-600 dark:bg-red-700',
      border: 'border-red-700 dark:border-red-800',
      text: 'text-white',
      icon: <AlertTriangle className="w-5 h-5" />,
    },
  }

  const style = types[type]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'rounded-lg border p-4',
            style.bg,
            style.border,
            style.text,
            className
          )}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {icon || style.icon}
            </div>
            <div className="flex-1">
              {title && (
                <h3 className="font-semibold mb-1">{title}</h3>
              )}
              <p className={cn('text-sm', type === 'emergency' && 'text-white/90')}>
                {message}
              </p>
              {action && (
                <div className="mt-3">
                  {action}
                </div>
              )}
            </div>
            {dismissible && (
              <button
                onClick={handleDismiss}
                className={cn(
                  'flex-shrink-0 p-1 rounded-lg transition-colors',
                  type === 'emergency' 
                    ? 'hover:bg-red-700 dark:hover:bg-red-800' 
                    : 'hover:bg-neutral-200 dark:hover:bg-neutral-800'
                )}
                aria-label="Dismiss alert"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Alert