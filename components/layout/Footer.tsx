import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Container from '@/components/ui/Container'
import { SITE_CONFIG, STATES, EXTERNAL_LINKS, SOCIAL_LINKS } from '@/src/lib/constants'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-white">
      <Container>
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/logos/logo-2.png"
                  alt="Nothing Better Health"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <span className="font-semibold text-lg">NBH</span>
              </div>
              <p className="text-neutral-400 text-sm">
                Virtual mental health services you can trust. Professional, compassionate care from the comfort of your home.
              </p>
              <div className="flex gap-3">
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Locations */}
            <div>
              <h3 className="font-semibold mb-4">Our Locations</h3>
              <ul className="space-y-2">
                {Object.values(STATES)
                  .filter(state => state.status === 'active')
                  .map((state) => (
                    <li key={state.id}>
                      <Link
                        href={`/locations/${state.id}`}
                        className="text-neutral-400 hover:text-white transition-colors text-sm"
                      >
                        {state.name}
                      </Link>
                    </li>
                  ))}
                <li className="pt-2">
                  <span className="text-neutral-500 text-sm italic">
                    Florida & New York coming soon
                  </span>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/providers"
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    Our Providers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <a
                    href={EXTERNAL_LINKS.patientPortal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    Patient Portal
                  </a>
                </li>
                <li>
                  <a
                    href={EXTERNAL_LINKS.sendReferral}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    Send a Referral
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`tel:${SITE_CONFIG.phone.replace(/\D/g, '')}`}
                    className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    {SITE_CONFIG.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    {SITE_CONFIG.email}
                  </a>
                </li>
                <li className="pt-2">
                  <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg">
                    <p className="text-sm font-medium text-red-400 mb-1">Emergency?</p>
                    <p className="text-xs text-neutral-400">
                      Call 988 for mental health crisis support
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-neutral-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-neutral-500 text-sm">
                © {currentYear} {SITE_CONFIG.name}. All rights reserved.
              </p>
              <div className="flex gap-6">
                <Link
                  href="/privacy"
                  className="text-neutral-500 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-neutral-500 hover:text-white transition-colors text-sm"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/hipaa"
                  className="text-neutral-500 hover:text-white transition-colors text-sm"
                >
                  HIPAA Notice
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer