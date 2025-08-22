'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Award, Calendar, MapPin, Clock, CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Section from '@/components/ui/Section'
import { PROVIDERS, EXTERNAL_LINKS } from '@/src/lib/constants'

export default function ProvidersPage() {
  return (
    <>
      {/* Hero Section */}
      <Section background="gradient" className="pt-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="primary" size="lg" className="mb-4">
              {/* EDITABLE: Team tagline */}
              Expert Care Team
            </Badge>
            <h1 className="heading-1 mb-4">
              Meet Your <span className="text-gradient-primary">Mental Health Providers</span>
            </h1>
            <p className="body-large text-neutral-600 dark:text-neutral-400">
              {/* EDITABLE: Team description */}
              Board-certified psychiatric nurse practitioners dedicated to your mental wellness. 
              Each provider brings unique expertise and a compassionate approach to care.
            </p>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center"
          >
            <Award className="w-8 h-8 text-primary-500 mx-auto mb-2" />
            <div className="font-semibold">Board Certified</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              {/* EDITABLE: Certification text */}
              All PMHNP-BC
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <Star className="w-8 h-8 text-primary-500 mx-auto mb-2" />
            <div className="font-semibold">Highly Rated</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              {/* EDITABLE: Rating text */}
              4.9/5 Patient Satisfaction
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <Clock className="w-8 h-8 text-primary-500 mx-auto mb-2" />
            <div className="font-semibold">Experienced</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              {/* EDITABLE: Experience text */}
              15+ Years Combined
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Providers Grid */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-8">
          {Object.values(PROVIDERS).map((provider, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover glass className="h-full overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 relative h-64 md:h-auto">
                    <Image
                      src={provider.image}
                      alt={provider.name}
                      fill
                      className="object-cover"
                    />
                    {provider.availability === 'available' && (
                      <Badge 
                        variant="success" 
                        dot 
                        className="absolute top-4 left-4 bg-white/90 dark:bg-neutral-900/90"
                      >
                        Accepting Patients
                      </Badge>
                    )}
                  </div>
                  
                  <div className="md:w-2/3 p-6">
                    <CardHeader className="p-0">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <CardTitle className="text-2xl">
                            {/* EDITABLE: Provider name */}
                            {provider.name}
                          </CardTitle>
                          <p className="text-primary-600 dark:text-primary-400 font-medium">
                            {/* EDITABLE: Provider credentials */}
                            {provider.credentials}
                          </p>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                            {/* EDITABLE: Provider title */}
                            {provider.title}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {/* EDITABLE: Provider bio */}
                        {provider.bio}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="p-0 mt-6 space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Award className="w-4 h-4 text-primary-500" />
                          Specialties
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {provider.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary">
                              {/* EDITABLE: Specialty */}
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary-500" />
                          Licensed States
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {provider.states.map((state) => (
                            <Badge key={state} variant="primary">
                              {/* EDITABLE: State license */}
                              {state.toUpperCase()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button
                          variant="primary"
                          leftIcon={<Calendar className="w-4 h-4" />}
                          as="a"
                          href={EXTERNAL_LINKS.bookAppointment}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Book with {provider.name.split(' ')[0]}
                        </Button>
                        <Link href={`/providers/${provider.id}`}>
                          <Button variant="outline">
                            View Full Profile
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Why Choose Our Providers */}
      <Section background="muted">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-2 text-center mb-12">
            Why Choose <span className="text-gradient-secondary">Our Providers</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">
                    {/* EDITABLE: Feature title */}
                    Evidence-Based Treatment
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {/* EDITABLE: Feature description */}
                    All treatment plans are based on the latest research and clinical guidelines
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">
                    {/* EDITABLE: Feature title */}
                    Collaborative Approach
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {/* EDITABLE: Feature description */}
                    We work with you to develop personalized treatment plans that fit your life
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">
                    {/* EDITABLE: Feature title */}
                    Continuous Education
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {/* EDITABLE: Feature description */}
                    Our providers stay current with the latest developments in psychiatric care
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">
                    {/* EDITABLE: Feature title */}
                    Cultural Sensitivity
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {/* EDITABLE: Feature description */}
                    Respectful care that honors your background, identity, and values
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">
                    {/* EDITABLE: Feature title */}
                    Accessible Communication
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {/* EDITABLE: Feature description */}
                    Secure messaging between appointments for questions and support
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">
                    {/* EDITABLE: Feature title */}
                    Holistic Care
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {/* EDITABLE: Feature description */}
                    We consider all aspects of your health and wellbeing in treatment planning
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="heading-2 mb-4">
            {/* EDITABLE: CTA heading */}
            Ready to Meet with a Provider?
          </h2>
          <p className="body-large text-neutral-600 dark:text-neutral-400 mb-8">
            {/* EDITABLE: CTA description */}
            Schedule your initial consultation today and take the first step 
            towards better mental health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="xl"
              variant="primary"
              leftIcon={<Calendar className="w-5 h-5" />}
              as="a"
              href={EXTERNAL_LINKS.bookAppointment}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Appointment
            </Button>
            <Button
              size="xl"
              variant="outline"
              as="a"
              href="/contact"
            >
              Have Questions?
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}