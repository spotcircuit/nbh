'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/src/lib/utils'

export interface LinkButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  className?: string
  target?: string
  rel?: string
}

const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  target,
  rel,
}) => {
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

  const isExternal = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')
  
  const linkClass = cn(
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    'relative inline-flex items-center justify-center',
    className
  )

  const content = (
    <>
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </>
  )

  if (isExternal) {
    return (
      <a
        href={href}
        className={linkClass}
        target={target}
        rel={rel}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={linkClass}>
      {content}
    </Link>
  )
}

export default LinkButton