'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Phone, Calendar } from 'lucide-react'
import { cn } from '@/src/lib/utils'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import { MAIN_NAV, STATES, EXTERNAL_LINKS } from '@/src/lib/constants'

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setShowLocationDropdown(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl shadow-soft'
            : 'bg-transparent'
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logos/logo-2.png"
                alt="Nothing Better Health"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="font-semibold text-lg hidden sm:block">
                Nothing Better Health
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {MAIN_NAV.map((item) => {
                if (item.name === 'Locations') {
                  return (
                    <div key={item.name} className="relative">
                      <button
                        onMouseEnter={() => setShowLocationDropdown(true)}
                        onMouseLeave={() => setShowLocationDropdown(false)}
                        className={cn(
                          'px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1',
                          isActive(item.href)
                            ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-950'
                            : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:text-primary-400 dark:hover:bg-neutral-900'
                        )}
                      >
                        {item.name}
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      
                      <AnimatePresence>
                        {showLocationDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            onMouseEnter={() => setShowLocationDropdown(true)}
                            onMouseLeave={() => setShowLocationDropdown(false)}
                            className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden"
                          >
                            {Object.values(STATES).map((state) => (
                              <Link
                                key={state.id}
                                href={`/locations/${state.id}`}
                                className="flex items-center justify-between px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                              >
                                <div>
                                  <div className="font-medium">{state.name}</div>
                                  {state.status === 'coming-soon' && (
                                    <div className="text-xs text-neutral-500">Coming Soon</div>
                                  )}
                                </div>
                                {state.status === 'active' && (
                                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                                )}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive(item.href)
                        ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-950'
                        : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:text-primary-400 dark:hover:bg-neutral-900'
                    )}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Phone className="w-4 h-4" />}
                
              >
                Call Now
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Calendar className="w-4 h-4" />}
              >
                Book Appointment
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </Container>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Panel */}
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-neutral-950 shadow-2xl">
              <div className="flex flex-col h-full pt-20 pb-6">
                <div className="flex-1 overflow-y-auto px-6">
                  <div className="space-y-1">
                    {MAIN_NAV.map((item) => {
                      if (item.name === 'Locations') {
                        return (
                          <div key={item.name} className="space-y-1">
                            <div className="px-4 py-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                              {item.name}
                            </div>
                            <div className="pl-4 space-y-1">
                              {Object.values(STATES)
                                .filter(state => state.status === 'active')
                                .map((state) => (
                                  <Link
                                    key={state.id}
                                href={`/locations/${state.id}`}
                                    className="block px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                  >
                                    {state.name}
                                  </Link>
                                ))}
                            </div>
                          </div>
                        )
                      }

                      return (
                        <Link
                          key={item.name}
                    href={item.href}
                          className={cn(
                            'block px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                            isActive(item.href)
                              ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-950'
                              : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:text-primary-400 dark:hover:bg-neutral-900'
                          )}
                        >
                          {item.name}
                        </Link>
                      )
                    })}
                  </div>
                </div>
                
                {/* Mobile Actions */}
                <div className="px-6 pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    leftIcon={<Phone className="w-4 h-4" />}
                    
                  >
                    Call Now
                  </Button>
                  <Button
                    variant="primary"
                    fullWidth
                    leftIcon={<Calendar className="w-4 h-4" />}
                  >
                    Book Appointment
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation