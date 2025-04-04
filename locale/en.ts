import { Messages } from 'next-intl'

const en: Messages = {
  Header: {
    docs: 'Docs',
    pricing: 'Pricing',
    about: 'About',
    loginIn: 'Login In',
    logout: 'Logout',
    pending: 'Loading...',
    authError: 'Login failed, please try again later',
  },
  HomePage: {
    light: 'Light',
    dark: 'Dark',
    system: 'System',
  },
  LocaleSwitch: {
    locale: '{locale, select, zh {中文} en {English} other {Unknown}}',
  },
  Hero: {
    getStarted: 'Get Started',
    readDocs: 'Read Docs',
  },
  LoginPage: {
    welcome: 'Welcome',
    welcomeDesc: 'Please select a login method to continue',
    google: 'Login with Google',
    github: 'Login with Github',
    agree: 'Login means you agree to our terms of service and privacy policy',
  },
  Pricing: {
    title: 'Simple and flexible pricing plans',
    description: 'Choose the plan that best suits your business needs, and upgrade at any time',
    free: {
      name: 'Free',
      description: 'Perfect for beginners',
      buttonText: 'Start Learning',
    },
    standard: {
      name: 'Standard',
      description: 'For developers and small teams',
      buttonText: 'Get Source Code',
      popularText: 'Popular Choice',
    },
    premium: {
      name: 'Premium',
      description: 'For professional teams and enterprises',
      price: 'Contact Us',
      buttonText: 'Contact Us',
    },
    features: {
      tutorials: 'Video Tutorials',
      basicComponents: 'Basic Components',
      communitySupport: 'Community Support',
      fullSourceCode: 'Full Source Code',
      advancedComponents: 'Advanced Components',
      prioritySupport: 'Priority Support',
      customService: 'Custom Services',
    },
  },
  Footer: {
    slogan: 'Build your SaaS application with the latest technology',
    copyright: '© {year} Easy Saas Next All rights reserved',
    privacyPolicy: 'Privacy Policy',
    docs: 'Docs',
    about: 'About',
    features: 'Features',
    pricing: 'Pricing',
    contact: 'Contact',
  },
  FAQ: {
    title: 'FAQ',
    description: 'Below are some answers to common questions',
    questions: [
      {
        question: 'What is Easy SaaS Next?',
        answer:
          'Easy SaaS Next is a SaaS application framework based on Nextjs, helping developers build SaaS applications quickly.',
      },
      {
        question: 'What are the advantages of Easy SaaS Next?',
        answer:
          'Easy SaaS Next is a SaaS application framework based on Nextjs, helping developers build SaaS applications quickly.',
      },
      {
        question: 'What are the features of Easy SaaS Next?',
        answer:
          'Easy SaaS Next is a SaaS application framework based on Nextjs, helping developers build SaaS applications quickly.',
      },
    ],
  },
}

export default en
