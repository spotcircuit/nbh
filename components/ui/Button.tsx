'use client'

import React from 'react'
import { cn } from '@/src/lib/utils'
import { motion } from 'framer-motion'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  animate?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      animate = true,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      accent: 'btn-accent',
      outline: 'btn-outline',
      ghost: 'btn-ghost',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'btn-lg',
      xl: 'btn-xl',
    }

    // Extract only the props that are safe to pass to motion.button
    const { 
      onDrag, 
      onDragEnd, 
      onDragStart,
      onAnimationStart,
      onAnimationEnd,
      onAnimationIteration,
      ...safeProps 
    } = props

    if (animate) {
      return (
        <motion.button
          ref={ref}
          className={cn(
            variants[variant],
            sizes[size],
            fullWidth && 'w-full',
            isLoading && 'opacity-70 cursor-wait',
            'relative',
            className
          )}
          disabled={disabled || isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          {...safeProps}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <span className={cn('flex items-center justify-center gap-2', isLoading && 'invisible')}>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </span>
        </motion.button>
      )
    }

    return (
      <button
        ref={ref}
        className={cn(
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          isLoading && 'opacity-70 cursor-wait',
          'relative',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <span className={cn('flex items-center justify-center gap-2', isLoading && 'invisible')}>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </span>
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button