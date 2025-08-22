'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  MapPin, 
  Users, 
  Heart, 
  Shield, 
  Clock,
  ChevronRight,
  Star,
  Phone,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardImage } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Alert from '@/components/ui/Alert'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import { STATES, PROVIDERS, SERVICES, EXTERNAL_LINKS, ALERT_MESSAGES } from '@/src/lib/constants'

export default function HomePage() {
  return (
    <>
      {/* Emergency Alert */}
      <div className="fixed top-16 md:top-20 left-0 right-0 z-40">
        <Container>
          <Alert
            type="emergency"
            title={ALERT_MESSAGES.emergency.title}
            message={ALERT_MESSAGES.emergency.message}
            dismissible
            action={
              <Button
                variant="secondary"
                size="sm"
                className="bg-white text-red-600 hover:bg-red-50"
                as="a"
                href="tel:988"
              >
                Call 988 Now
              </Button>
            }
          />
        </Container>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-mesh-bg pt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-hero-pattern opacity-5" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-20 left-10 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl"
          />
        </div>

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="primary" size="lg" className="mb-4">
                Virtual Care Available
              </Badge>
              
              <h1 className="heading-1 mb-6">
                <span className="text-gradient-primary">Mental Health Care</span>
                <br />
                You Can Trust
              </h1>
              
              <p className="body-large text-neutral-600 dark:text-neutral-400 mb-8">
                Professional psychiatric services from the comfort of your home. 
                Licensed providers in DC, Maryland, and Virginia ready to help you 
                thrive.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="xl"
                  leftIcon={<Calendar className="w-5 h-5" />}
                  as="a"
                  href={EXTERNAL_LINKS.bookAppointment}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Appointment
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  leftIcon={<Phone className="w-5 h-5" />}
                  as="a"
                  href="tel:2025550100"
                >
                  Call for Consultation
                </Button>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary-500" />
                  <span className="text-sm font-medium">HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary-500" />
                  <span className="text-sm font-medium">Same Week Appointments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary-500" />
                  <span className="text-sm font-medium">Expert Providers</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/general/Group Hug.jpg"
                  alt="Mental Health Support"
                  width={600}
                  height={500}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent" />
                
                {/* Floating Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl rounded-xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {Object.values(PROVIDERS).slice(0, 3).map((provider) => (
                        <Image
                          key={provider.id}
                          src={provider.image}
                          alt={provider.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full border-2 border-white"
                        />
                      ))}
                    </div>
                    <div>
                      <p className="font-semibold">3+ Expert Providers</p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Ready to help you today
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Locations Section */}
      <Section background="muted">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">
            We Serve Your <span className="text-gradient-primary">Community</span>
          </h2>
          <p className="body-large text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Virtual mental health services licensed in multiple states, 
            with providers who understand your local community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(STATES)
            .filter(state => state.status === 'active')
            .map((state, index) => (
              <motion.div
                key={state.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover glass animate>
                  <CardImage 
                    src={state.image} 
                    alt={state.name}
                    height={200}
                    overlay
                  />
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{state.name}</CardTitle>
                        <CardDescription>{state.description}</CardDescription>
                      </div>
                      <Badge variant="success" dot>
                        Active
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-primary-500" />
                        <span>{state.providers.length} Providers Available</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Shield className="w-4 h-4 text-primary-500" />
                        <span>{state.insurances.length}+ Insurance Plans</span>
                      </div>
                    </div>
                    <Link href={`/locations/${state.id}`}>
                      <Button variant="primary" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>

        {/* Coming Soon States */}
        <div className="mt-8 p-6 bg-primary-50 dark:bg-primary-950/30 rounded-xl">
          <h3 className="font-semibold mb-2">Expanding Soon</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            We're working to bring our services to more communities:
          </p>
          <div className="flex flex-wrap gap-3">
            {Object.values(STATES)
              .filter(state => state.status === 'coming-soon')
              .map((state) => (
                <Badge key={state.id} variant="secondary" size="lg">
                  {state.name} - 2025
                </Badge>
              ))}
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">
            Comprehensive <span className="text-gradient-secondary">Mental Health Services</span>
          </h2>
          <p className="body-large text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Evidence-based treatment tailored to your unique needs
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Providers Section */}
      <Section background="gradient">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">
            Meet Your <span className="text-gradient-primary">Care Team</span>
          </h2>
          <p className="body-large text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Board-certified psychiatric nurse practitioners with years of experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {Object.values(PROVIDERS).map((provider, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover glass className="text-center">
                <CardHeader>
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={provider.image}
                      alt={provider.name}
                      fill
                      className="rounded-full object-cover"
                    />
                    {provider.availability === 'available' && (
                      <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <CardTitle>{provider.name}</CardTitle>
                  <p className="text-primary-600 dark:text-primary-400 font-medium">
                    {provider.credentials}
                  </p>
                  <CardDescription className="mt-3">
                    {provider.bio}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {provider.specialties.slice(0, 3).map((specialty) => (
                      <Badge key={specialty} variant="secondary" size="sm">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/providers/${provider.id}`}>
                    <Button variant="outline" fullWidth>
                      View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="dark" className="text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="heading-2 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="body-large mb-8 text-neutral-300">
            Take the first step towards better mental health. 
            Our compassionate team is here to support you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="xl"
              variant="accent"
              leftIcon={<Calendar className="w-5 h-5" />}
              as="a"
              href={EXTERNAL_LINKS.bookAppointment}
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule Your First Visit
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-neutral-900"
              as="a"
              href="/faq"
            >
              Have Questions?
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}