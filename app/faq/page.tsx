'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Bell, HelpCircle, MessageCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'

export default function FAQPage() {
  return (
    <Section className="min-h-[80vh] flex items-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/general/11062b_b7f119529e304e9ba3d047d4941cde54~mv2.jpg"
          alt="FAQ"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-accent-800/80 to-primary-900/90" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <Badge variant="secondary" size="lg" className="mb-6">
            <HelpCircle className="w-4 h-4 mr-2 inline" />
            Under Development
          </Badge>

          <h1 className="heading-1 text-white mb-6">
            Frequently Asked Questions
          </h1>

          <p className="body-large text-white/90 mb-8">
            We&apos;re compiling answers to your most common questions about our services, insurance, 
            appointments, and virtual care. This page will be your go-to resource for quick answers.
          </p>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">FAQ Topics Coming:</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-accent-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-white">Getting Started</p>
                  <p className="text-sm text-white/70">How to begin your treatment journey</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-accent-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-white">Insurance & Payment</p>
                  <p className="text-sm text-white/70">Coverage and payment options</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-accent-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-white">Virtual Visits</p>
                  <p className="text-sm text-white/70">How telehealth appointments work</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-accent-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-white">Medications</p>
                  <p className="text-sm text-white/70">Prescription and refill process</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button 
                variant="accent" 
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
              className="border-white text-white hover:bg-white hover:text-accent-600"
            >
              Notify Me When Ready
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}