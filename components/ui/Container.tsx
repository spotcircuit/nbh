import React from 'react'
import { cn } from '@/src/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  as?: React.ElementType
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  className,
  size = 'lg',
  as: Component = 'div'
}) => {
  const sizes = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[90rem]',
    full: 'max-w-full',
  }

  return (
    <Component 
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        sizes[size],
        className
      )}
    >
      {children}
    </Component>
  )
}

export default Container