// Site configuration
export const SITE_CONFIG = {
  name: 'Nothing Better Health',
  description: 'Virtual mental health services in DC, Maryland, and Virginia',
  url: 'https://www.nothingbetterhealth.com',
  phone: '(202) 555-0100',
  email: 'info@nothingbetterhealth.com',
  emergencyPhone: '988', // National Suicide Prevention Lifeline
}

// Navigation items
export const MAIN_NAV = [
  { name: 'Home', href: '/' },
  { name: 'Locations', href: '/locations' },
  { name: 'Our Team', href: '/providers' },
  { name: 'Services', href: '/services' },
  { name: 'Resources', href: '/resources' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
]

// States configuration
export const STATES = {
  dc: {
    id: 'dc',
    name: 'District of Columbia',
    shortName: 'DC',
    status: 'active',
    image: '/images/general/Washington Monument.jpg',
    description: 'Comprehensive mental health services for DC residents',
    providers: ['ed-stern', 'calvin-layne'],
    insurances: ['Aetna', 'Blue Cross Blue Shield', 'Cigna', 'United Healthcare'],
  },
  maryland: {
    id: 'maryland',
    name: 'Maryland',
    shortName: 'MD',
    status: 'active',
    image: '/images/general/11062b_1f3cb3390bd34c5faf2fb9d7861d23f8~mv2.jpg',
    description: 'Virtual mental health care throughout Maryland',
    providers: ['calvin-layne', 'koda-brinker'],
    insurances: ['CareFirst', 'Kaiser Permanente', 'Aetna', 'Cigna'],
  },
  virginia: {
    id: 'virginia',
    name: 'Virginia',
    shortName: 'VA',
    status: 'active',
    image: '/images/general/1630cf_31f9f7aa5f584a0fab9a42b8a012465b~mv2.jpg',
    description: 'Professional psychiatric services for Virginia',
    providers: ['ed-stern', 'koda-brinker'],
    insurances: ['Anthem', 'Optima Health', 'Aetna', 'United Healthcare'],
  },
  florida: {
    id: 'florida',
    name: 'Florida',
    shortName: 'FL',
    status: 'coming-soon',
    image: '/images/general/Image by Laura Ockel.jpg',
    description: 'Coming Soon in 2025',
    providers: [],
    insurances: [],
  },
  newyork: {
    id: 'newyork',
    name: 'New York',
    shortName: 'NY',
    status: 'coming-soon',
    image: '/images/general/Image by Luca Bravo.jpg',
    description: 'Tri-Borough Area - Coming Soon in 2025',
    providers: [],
    insurances: [],
  },
}

// Provider configuration
export const PROVIDERS = {
  'ed-stern': {
    id: 'ed-stern',
    name: 'Ed Stern',
    credentials: 'PMHNP-BC',
    title: 'Psychiatric Mental Health Nurse Practitioner',
    image: '/images/general/1630cf_76d71c712d0642dda2fa94624a084704~mv2.jpg',
    specialties: ['Depression', 'Anxiety', 'ADHD', 'Bipolar Disorder'],
    bio: 'Ed Stern is a board-certified psychiatric mental health nurse practitioner with extensive experience in treating mood disorders and ADHD.',
    availability: 'available',
    states: ['dc', 'virginia'],
  },
  'calvin-layne': {
    id: 'calvin-layne',
    name: 'Calvin Layne',
    credentials: 'PMHNP-BC',
    title: 'Psychiatric Mental Health Nurse Practitioner',
    image: '/images/general/calvin photo_edited_edited_edited.png',
    specialties: ['Trauma', 'PTSD', 'Depression', 'Anxiety'],
    bio: 'Calvin Layne specializes in trauma-informed care and has a passion for helping individuals overcome life challenges.',
    availability: 'available',
    states: ['dc', 'maryland'],
  },
  'koda-brinker': {
    id: 'koda-brinker',
    name: 'Koda Brinker',
    credentials: 'PMHNP-BC',
    title: 'Psychiatric Mental Health Nurse Practitioner',
    image: '/images/general/11062b_bc13bb2bc56e45ea95aa0dda3ac4dce0~mv2.jpg',
    specialties: ['Adolescent Psychiatry', 'ADHD', 'Anxiety', 'Depression'],
    bio: 'Koda Brinker focuses on adolescent and young adult mental health with a compassionate, evidence-based approach.',
    availability: 'limited',
    states: ['maryland', 'virginia'],
  },
}

// Services offered
export const SERVICES = [
  {
    id: 'medication-management',
    name: 'Medication Management',
    icon: 'pill',
    description: 'Expert psychiatric medication evaluation, prescription, and monitoring',
    features: ['Initial evaluation', 'Medication adjustments', 'Side effect management', 'Regular monitoring'],
  },
  {
    id: 'psychiatric-evaluation',
    name: 'Psychiatric Evaluation',
    icon: 'clipboard',
    description: 'Comprehensive mental health assessments and diagnosis',
    features: ['90-minute initial evaluation', 'Diagnostic assessment', 'Treatment planning', 'Referral coordination'],
  },
  {
    id: 'adhd-treatment',
    name: 'ADHD Treatment',
    icon: 'brain',
    description: 'Specialized evaluation and treatment for ADHD in adults and adolescents',
    features: ['ADHD testing', 'Medication options', 'Behavioral strategies', 'Academic support'],
  },
  {
    id: 'anxiety-depression',
    name: 'Anxiety & Depression',
    icon: 'heart',
    description: 'Evidence-based treatment for mood and anxiety disorders',
    features: ['Mood assessment', 'Medication therapy', 'Crisis support', 'Long-term management'],
  },
]

// Insurance providers
export const INSURANCE_PROVIDERS = [
  { name: 'Aetna', logo: '/images/insurance/aetna.png' },
  { name: 'Blue Cross Blue Shield', logo: '/images/insurance/bcbs.png' },
  { name: 'Cigna', logo: '/images/insurance/cigna.png' },
  { name: 'United Healthcare', logo: '/images/insurance/united.png' },
  { name: 'CareFirst', logo: '/images/insurance/carefirst.png' },
  { name: 'Kaiser Permanente', logo: '/images/insurance/kaiser.png' },
  { name: 'Anthem', logo: '/images/insurance/anthem.png' },
  { name: 'Optima Health', logo: '/images/insurance/optima.png' },
]

// FAQ Categories
export const FAQ_CATEGORIES = [
  'Getting Started',
  'Insurance & Payment',
  'Appointments',
  'Medications',
  'Virtual Visits',
  'Privacy & Security',
]

// Social links
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/nothingbetterhealth',
  twitter: 'https://twitter.com/nbhealth',
  instagram: 'https://instagram.com/nothingbetterhealth',
  linkedin: 'https://linkedin.com/company/nothing-better-health',
}

// External links
export const EXTERNAL_LINKS = {
  patientPortal: 'https://nbh.intakeq.com/portal',
  sendReferral: 'https://intakeq.com/new/pfa9v5/rliulx',
  bookAppointment: 'https://nbh.intakeq.com/booking',
}

// Alert messages
export const ALERT_MESSAGES = {
  emergency: {
    title: 'Mental Health Emergency?',
    message: 'If you are experiencing a mental health crisis, please call 988 or go to your nearest emergency room.',
    type: 'emergency' as const,
  },
  holiday: {
    title: 'Holiday Schedule',
    message: 'Our offices will be closed for Thanksgiving. Emergency services are still available.',
    type: 'info' as const,
  },
}