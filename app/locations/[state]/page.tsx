'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Users, 
  Shield, 
  Clock, 
  Calendar,
  CheckCircle,
  Phone,
  Mail,
  ArrowLeft
} from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import { STATES, PROVIDERS, EXTERNAL_LINKS } from '@/src/lib/constants'

export default function StateLocationPage() {
  const params = useParams()
  const stateId = params?.state as string
  const state = STATES[stateId as keyof typeof STATES]

  if (!state) {
    return (
      <Container className="py-20 text-center">
        <h1 className="heading-2 mb-4">Location not found</h1>
        <Link href="/locations">
          <Button variant="primary">View All Locations</Button>
        </Link>
      </Container>
    )
  }

  const stateProviders = state.providers
    .map(id => PROVIDERS[id as keyof typeof PROVIDERS])
    .filter(Boolean)

  if (state.status === 'coming-soon') {
    return (
      <Section className="min-h-[60vh] flex items-center">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="secondary" size="lg" className="mb-4">
              Coming Soon
            </Badge>
            <h1 className="heading-2 mb-4">{state.name}</h1>
            <p className="body-large text-neutral-600 dark:text-neutral-400 mb-8">
              We're excited to announce that Nothing Better Health will be expanding to {state.name} in 2025. 
              Join our waitlist to be notified when we launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Join Waitlist
              </Button>
              <Link href="/locations">
                <Button variant="outline" size="lg" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  View Other Locations
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={state.image}
            alt={state.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        
        <Container className="relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Link href="/locations">
              <Button 
                variant="ghost" 
                size="sm" 
                leftIcon={<ArrowLeft className="w-4 h-4" />}
                className="text-white hover:bg-white/10 mb-6"
              >
                All Locations
              </Button>
            </Link>
            
            <h1 className="heading-1 mb-4">
              Mental Health Care in {state.name}
            </h1>
            
            <p className="body-large mb-8 text-white/90">
              {state.description}. Virtual appointments available throughout {state.shortName}.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Badge variant="success" size="lg" dot>
                Now Accepting Patients
              </Badge>
              <Badge variant="info" size="lg">
                {stateProviders.length} Providers
              </Badge>
              <Badge variant="secondary" size="lg">
                {state.insurances.length}+ Insurance Plans
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="xl"
                variant="accent"
                leftIcon={<Calendar className="w-5 h-5" />}
                as="a"
                href={EXTERNAL_LINKS.bookAppointment}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book {state.shortName} Appointment
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
                leftIcon={<Phone className="w-5 h-5" />}
                as="a"
                href="tel:2025550100"
              >
                Call for Info
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Key Features */}
      <Section background="muted">
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="text-center h-full">
              <CardHeader>
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <CardTitle>100% Virtual</CardTitle>
                <CardDescription>
                  No commute needed. Access care from anywhere in {state.name}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="text-center h-full">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-secondary-600 dark:text-secondary-400" />
                </div>
                <CardTitle>Flexible Hours</CardTitle>
                <CardDescription>
                  Evening and weekend appointments available
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="text-center h-full">
              <CardHeader>
                <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-accent-600 dark:text-accent-400" />
                </div>
                <CardTitle>Licensed in {state.shortName}</CardTitle>
                <CardDescription>
                  All providers are fully licensed to practice in {state.name}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Providers Section */}
      <Section>
        <div className="mb-12">
          <h2 className="heading-2 mb-4">
            Your {state.name} <span className="text-gradient-primary">Mental Health Team</span>
          </h2>
          <p className="body-large text-neutral-600 dark:text-neutral-400">
            Expert providers licensed to practice in {state.shortName}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stateProviders.map((provider, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Image
                      src={provider.image}
                      alt={provider.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <CardTitle className="text-lg">{provider.name}</CardTitle>
                      <p className="text-primary-600 dark:text-primary-400 text-sm font-medium">
                        {provider.credentials}
                      </p>
                      {provider.availability === 'available' ? (
                        <Badge variant="success" size="sm" dot className="mt-2">
                          Available
                        </Badge>
                      ) : (
                        <Badge variant="warning" size="sm" className="mt-2">
                          Limited Availability
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription className="mt-4">
                    {provider.bio}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-2">Specialties:</p>
                      <div className="flex flex-wrap gap-2">
                        {provider.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" size="sm">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Link href={`/providers/${provider.id}`}>
                      <Button variant="outline" fullWidth size="sm">
                        View Full Profile
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Insurance Section */}
      <Section background="muted">
        <div className="mb-12">
          <h2 className="heading-2 mb-4">
            Insurance <span className="text-gradient-secondary">Accepted</span>
          </h2>
          <p className="body-large text-neutral-600 dark:text-neutral-400">
            We accept most major insurance plans in {state.name}
          </p>
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {state.insurances.map((insurance) => (
                <div key={insurance} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="font-medium">{insurance}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Don't see your insurance? We also offer competitive self-pay rates 
                and can provide superbills for out-of-network reimbursement.
              </p>
              <Button variant="primary">
                Verify Insurance Coverage
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* CTA Section */}
      <Section background="gradient">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="heading-2 mb-4">
            Start Your Mental Health Journey in {state.name}
          </h2>
          <p className="body-large text-neutral-600 dark:text-neutral-400 mb-8">
            Professional, compassionate care is just a click away. 
            Book your virtual appointment today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="xl"
              variant="primary"
              leftIcon={<Calendar className="w-5 h-5" />}
              as="a"
              href={EXTERNAL_LINKS.bookAppointment}
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule Appointment
            </Button>
            <Button
              size="xl"
              variant="outline"
              leftIcon={<Mail className="w-5 h-5" />}
              as="a"
              href="/contact"
            >
              Contact Us
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 justify-center text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary-500" />
              <span>Same week availability</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary-500" />
              <span>Insurance accepted</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary-500" />
              <span>HIPAA compliant</span>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}