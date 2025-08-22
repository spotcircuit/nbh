'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Bell, BookOpen, FileText, Video, Download } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'

export default function ResourcesPage() {
  return (
    <Section className="min-h-[80vh] flex items-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/general/Writing on the Board.jpg"
          alt="Mental Health Resources"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-900/90 via-secondary-800/80 to-primary-900/90" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <Badge variant="secondary" size="lg" className="mb-6">
            <BookOpen className="w-4 h-4 mr-2 inline" />
            Coming Soon
          </Badge>

          <h1 className="heading-1 text-white mb-6">
            Mental Health Resources
          </h1>

          <p className="body-large text-white/90 mb-8">
            We&apos;re building a comprehensive resource library to support your mental health journey. 
            Soon you&apos;ll find educational materials, self-help guides, and valuable tools here.
          </p>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Resources Coming Soon:</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-secondary-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-white">Educational Articles</p>
                  <p className="text-sm text-white/70">Expert-written content on mental health topics</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Video className="w-5 h-5 text-secondary-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-white">Video Library</p>
                  <p className="text-sm text-white/70">Helpful videos and webinars</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Download className="w-5 h-5 text-secondary-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-white">Downloadable Guides</p>
                  <p className="text-sm text-white/70">Worksheets and self-help materials</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-secondary-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-white">Treatment Information</p>
                  <p className="text-sm text-white/70">Learn about different treatment options</p>
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
              className="border-white text-white hover:bg-white hover:text-secondary-900"
            >
              Notify Me When Ready
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}