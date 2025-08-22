'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Bell, User } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import { PROVIDERS } from '@/src/lib/constants'

export default function ProviderProfilePage() {
  const params = useParams()
  const providerId = params?.id as string
  const provider = PROVIDERS[providerId as keyof typeof PROVIDERS]

  // If provider not found, show coming soon
  if (!provider) {
    return (
      <Section className="min-h-[80vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/general/11062b_bc13bb2bc56e45ea95aa0dda3ac4dce0~mv2.jpg"
            alt="Provider Profile"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-secondary-800/80 to-primary-900/90" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="secondary" size="lg" className="mb-6">
              <User className="w-4 h-4 mr-2 inline" />
              Profile Not Found
            </Badge>

            <h1 className="heading-1 text-white mb-6">
              Provider Profile
            </h1>

            <p className="body-large text-white/90 mb-8">
              This provider profile is not available yet. Please check back soon or view our other providers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/providers">
                <Button 
                  variant="secondary" 
                  size="lg"
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  View All Providers
                </Button>
              </Link>
              <Link href="/">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary-900"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </Section>
    )
  }

  // Show actual provider profile (coming soon version)
  return (
    <Section className="min-h-[80vh] flex items-center relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={provider.image}
          alt={provider.name}
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-secondary-800/80 to-primary-900/90" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <Badge variant="secondary" size="lg" className="mb-6">
            <User className="w-4 h-4 mr-2 inline" />
            Full Profile Coming Soon
          </Badge>

          <div className="w-32 h-32 mx-auto mb-6 relative">
            <Image
              src={provider.image}
              alt={provider.name}
              fill
              className="rounded-full object-cover border-4 border-white/20"
            />
          </div>

          <h1 className="heading-1 text-white mb-2">
            {provider.name}
          </h1>
          
          <p className="text-xl text-primary-300 mb-6">
            {provider.credentials} • {provider.title}
          </p>

          <p className="body-large text-white/90 mb-8">
            {provider.bio}
          </p>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Info:</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-white/70 mb-1">Specialties:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {provider.specialties.map((specialty) => (
                    <Badge key={specialty} variant="primary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-white/70 mb-1">Licensed States:</p>
                <div className="flex gap-2 justify-center">
                  {provider.states.map((state) => (
                    <Badge key={state} variant="secondary">
                      {state.toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="text-white/70 mb-8">
            Full provider profiles with detailed information, credentials, and booking options are being developed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/providers">
              <Button 
                variant="secondary" 
                size="lg"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Back to Providers
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              leftIcon={<Bell className="w-4 h-4" />}
              className="border-white text-white hover:bg-white hover:text-secondary-900"
            >
              Notify When Available
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}