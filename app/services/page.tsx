'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Bell, Clock, Wrench } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'

export default function ServicesPage() {
  return (
    <Section className="min-h-[80vh] flex items-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/general/Pills.jpg"
          alt="Mental Health Services"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/80 to-secondary-900/90" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <Badge variant="secondary" size="lg" className="mb-6">
            <Wrench className="w-4 h-4 mr-2 inline" />
            Under Construction
          </Badge>

          <h1 className="heading-1 text-white mb-6">
            Our Services
          </h1>

          <p className="body-large text-white/90 mb-8">
            We&apos;re currently updating our services page to better showcase our comprehensive mental health offerings. 
            Check back soon for detailed information about our treatment options.
          </p>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">What to Expect:</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-white">Medication Management</p>
                  <p className="text-sm text-white/70">Expert psychiatric medication services</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-white">ADHD Treatment</p>
                  <p className="text-sm text-white/70">Specialized ADHD evaluation and care</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-white">Depression & Anxiety</p>
                  <p className="text-sm text-white/70">Evidence-based treatment approaches</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-white">Psychiatric Evaluation</p>
                  <p className="text-sm text-white/70">Comprehensive mental health assessments</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button 
                variant="secondary" 
                size="lg"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Back to Home
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              leftIcon={<Bell className="w-4 h-4" />}
              className="border-white text-white hover:bg-white hover:text-primary-900"
            >
              Notify Me When Ready
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}