'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Bell, Mail, Phone, MapPin, Clock } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import { SITE_CONFIG } from '@/src/lib/constants'

export default function ContactPage() {
  return (
    <Section className="min-h-[80vh] flex items-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/general/Guy Looking at Ocean.jpg"
          alt="Contact Us"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-secondary-800/80 to-accent-900/90" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <Badge variant="primary" size="lg" className="mb-6">
            <Mail className="w-4 h-4 mr-2 inline" />
            Get In Touch
          </Badge>

          <h1 className="heading-1 text-white mb-6">
            Contact Us
          </h1>

          <p className="body-large text-white/90 mb-8">
            We&apos;re here to help you on your mental health journey. Our contact form is being updated, 
            but you can still reach us through the methods below.
          </p>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">Available Contact Methods:</h2>
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              <a href={`tel:${SITE_CONFIG.phone.replace(/\D/g, '')}`} 
                 className="flex items-start gap-3 hover:bg-white/10 p-3 rounded-lg transition-colors">
                <Phone className="w-5 h-5 text-primary-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-white">Call Us</p>
                  <p className="text-sm text-white/70">{SITE_CONFIG.phone}</p>
                </div>
              </a>
              <a href={`tel:${SITE_CONFIG.phone.replace(/\D/g, '')}`}
                 className="flex items-start gap-3 hover:bg-white/10 p-3 rounded-lg transition-colors">
                <Mail className="w-5 h-5 text-primary-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-white">Email Us</p>
                  <p className="text-sm text-white/70">{SITE_CONFIG.email}</p>
                </div>
              </a>
              <div className="flex items-start gap-3 p-3">
                <MapPin className="w-5 h-5 text-primary-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-white">Service Areas</p>
                  <p className="text-sm text-white/70">DC, Maryland, Virginia (Virtual)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3">
                <Clock className="w-5 h-5 text-primary-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-white">Response Time</p>
                  <p className="text-sm text-white/70">Within 24-48 hours</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-500/20 backdrop-blur-md rounded-xl p-4 mb-8 border border-red-400/30">
            <p className="text-white font-medium">Mental Health Emergency?</p>
            <p className="text-white/90 text-sm mt-1">Call 988 for immediate crisis support</p>
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
              variant="primary" 
              size="lg"
              leftIcon={<Phone className="w-4 h-4" />}
            >
              Call Now
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}