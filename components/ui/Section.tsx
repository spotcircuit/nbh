import React from 'react'
import { cn } from '@/src/lib/utils'
import Container from './Container'

interface SectionProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  size?: 'sm' | 'md' | 'lg'
  background?: 'default' | 'muted' | 'gradient' | 'dark'
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  as?: React.ElementType
  id?: string
}

const Section: React.FC<SectionProps> = ({ 
  children, 
  className,
  containerClassName,
  size = 'md',
  background = 'default',
  containerSize = 'lg',
  as: Component = 'section',
  id
}) => {
  const sizes = {
    sm: 'section-sm',
    md: 'section',
    lg: 'section-lg',
  }

  const backgrounds = {
    default: '',
    muted: 'bg-neutral-50 dark:bg-neutral-900/50',
    gradient: 'gradient-mesh-bg',
    dark: 'bg-neutral-900 dark:bg-neutral-950 text-white',
  }

  return (
    <Component 
      id={id}
      className={cn(
        sizes[size],
        backgrounds[background],
        className
      )}
    >
      <Container size={containerSize} className={containerClassName}>
        {children}
      </Container>
    </Component>
  )
}

export default Section