'use client'

import React from 'react'
import { cn } from '@/src/lib/utils'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface CardProps {
  className?: string
  children?: React.ReactNode
  hover?: boolean
  glow?: boolean
  glass?: boolean
  animate?: boolean
  onClick?: () => void
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hover = false, glow = false, glass = false, animate = false, onClick, ...props }, ref) => {
    const Component = animate ? motion.div : 'div'
    const animationProps = animate
      ? {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
        }
      : {}

    return (
      <Component
        ref={ref}
        className={cn(
          'card',
          hover && 'card-hover cursor-pointer',
          glow && 'card-glow',
          glass && 'glass',
          onClick && 'cursor-pointer',
          className
        )}
        onClick={onClick}
        {...animationProps}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Card.displayName = 'Card'

interface CardHeaderProps {
  className?: string
  children?: React.ReactNode
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pb-4', className)} {...props}>
      {children}
    </div>
  )
)

CardHeader.displayName = 'CardHeader'

interface CardContentProps {
  className?: string
  children?: React.ReactNode
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  )
)

CardContent.displayName = 'CardContent'

interface CardFooterProps {
  className?: string
  children?: React.ReactNode
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-4 border-t border-neutral-200 dark:border-neutral-800', className)} {...props}>
      {children}
    </div>
  )
)

CardFooter.displayName = 'CardFooter'

interface CardImageProps {
  src: string
  alt: string
  className?: string
  height?: number
  width?: number
  overlay?: boolean
}

export const CardImage: React.FC<CardImageProps> = ({ src, alt, className, height = 200, width = 400, overlay = false }) => {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      )}
    </div>
  )
}

CardImage.displayName = 'CardImage'

interface CardTitleProps {
  className?: string
  children?: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, as: Component = 'h3', ...props }, ref) => (
    <Component ref={ref} className={cn('text-xl font-semibold', className)} {...props}>
      {children}
    </Component>
  )
)

CardTitle.displayName = 'CardTitle'

interface CardDescriptionProps {
  className?: string
  children?: React.ReactNode
}

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cn('text-neutral-600 dark:text-neutral-400 mt-2', className)} {...props}>
      {children}
    </p>
  )
)

CardDescription.displayName = 'CardDescription'

export default Card