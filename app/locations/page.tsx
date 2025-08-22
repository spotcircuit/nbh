'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Users, Clock, Search, Filter } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardImage } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import { STATES, PROVIDERS } from '@/src/lib/constants'

export default function LocationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'coming-soon'>('all')

  const filteredStates = Object.values(STATES).filter(state => {
    const matchesSearch = state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          state.shortName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'all' || state.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const activeStates = Object.values(STATES).filter(s => s.status === 'active')
  const comingSoonStates = Object.values(STATES).filter(s => s.status === 'coming-soon')

  return (
    <>
      {/* Hero Section */}
      <Section background="gradient" className="pt-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-1 mb-4">
              Our <span className="text-gradient-primary">Service Locations</span>
            </h1>
            <p className="body-large text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Virtual mental health care across multiple states. Find licensed providers in your area 
              who understand your community and are ready to help.
            </p>
          </motion.div>
        </div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by state name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'primary' : 'outline'}
                onClick={() => setFilterStatus('all')}
                size="md"
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'active' ? 'primary' : 'outline'}
                onClick={() => setFilterStatus('active')}
                size="md"
              >
                Active
              </Button>
              <Button
                variant={filterStatus === 'coming-soon' ? 'primary' : 'outline'}
                onClick={() => setFilterStatus('coming-soon')}
                size="md"
              >
                Coming Soon
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {activeStates.length}
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">Active States</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">
              {Object.keys(PROVIDERS).length}
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">Licensed Providers</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-accent-600 dark:text-accent-400 mb-2">
              1000+
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">Patients Served</p>
          </motion.div>
        </div>
      </Section>

      {/* Locations Grid */}
      <Section>
        {filteredStates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              No locations found matching your search.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('')
              setFilterStatus('all')
            }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStates.map((state, index) => {
              const stateProviders = state.providers
                .map(id => PROVIDERS[id as keyof typeof PROVIDERS])
                .filter(Boolean)

              return (
                <motion.div
                  key={state.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card hover glass className="h-full">
                    <CardImage
                      src={state.image}
                      alt={state.name}
                      height={200}
                      overlay
                    />
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle>{state.name}</CardTitle>
                        {state.status === 'active' ? (
                          <Badge variant="success" dot>Active</Badge>
                        ) : (
                          <Badge variant="secondary">Coming 2025</Badge>
                        )}
                      </div>
                      <CardDescription>
                        {state.description}
                      </CardDescription>
                    </CardHeader>
                    
                    {state.status === 'active' && (
                      <CardContent>
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-primary-500" />
                            <span>{stateProviders.length} Providers</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-primary-500" />
                            <span>Virtual visits statewide</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-primary-500" />
                            <span>Same week appointments</span>
                          </div>
                        </div>

                        {/* Provider Avatars */}
                        {stateProviders.length > 0 && (
                          <div className="mb-6">
                            <p className="text-sm font-medium mb-2">Available Providers:</p>
                            <div className="flex -space-x-2">
                              {stateProviders.map((provider) => (
                                <Image
                                  key={provider.id}
                                  src={provider.image}
                                  alt={provider.name}
                                  width={32}
                                  height={32}
                                  className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900"
                                  title={provider.name}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        <Link href={`/locations/${state.id}`}>
                          <Button variant="primary" fullWidth>
                            View {state.shortName} Details
                          </Button>
                        </Link>
                      </CardContent>
                    )}

                    {state.status === 'coming-soon' && (
                      <CardContent>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                          We're expanding to {state.name} soon! Join our waitlist to be the first to know when we launch.
                        </p>
                        <Button variant="outline" fullWidth>
                          Join Waitlist
                        </Button>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}
      </Section>

      {/* Map Section (Visual Placeholder) */}
      <Section background="muted">
        <div className="text-center mb-8">
          <h2 className="heading-2 mb-4">Coverage Map</h2>
          <p className="body-large text-neutral-600 dark:text-neutral-400">
            Licensed to provide virtual care across the Mid-Atlantic region
          </p>
        </div>
        
        <Card className="overflow-hidden">
          <div className="relative h-[400px] bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                <p className="text-lg font-medium">Interactive Map Coming Soon</p>
                <p className="text-neutral-600 dark:text-neutral-400">
                  View our service areas at a glance
                </p>
              </div>
            </div>
            
            {/* State badges positioned roughly on map */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2">
              <Badge variant="success" size="lg">DC</Badge>
            </div>
            <div className="absolute top-1/2 left-1/3">
              <Badge variant="success" size="lg">MD</Badge>
            </div>
            <div className="absolute top-1/2 right-1/3">
              <Badge variant="success" size="lg">VA</Badge>
            </div>
          </div>
        </Card>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="heading-2 mb-4">
            Can't Find Your State?
          </h2>
          <p className="body-large text-neutral-600 dark:text-neutral-400 mb-8">
            We're actively working to expand our services to more states. 
            Join our waitlist to be notified when we're available in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="primary">
              Join Expansion Waitlist
            </Button>
            <Button size="lg" variant="outline" as="a" href="/contact">
              Contact Us
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}