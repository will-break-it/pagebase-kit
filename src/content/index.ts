// Content loader for Pagebase client sites
// Loads JSON content files at build time

export type Locale = 'de' | 'en';

export interface ClientConfig {
  id: string;
  name: string;
  domain: string;
  defaultLocale: Locale;
  locales: Locale[];
  theme: {
    primaryColor: string;
    fontFamily: string;
  };
  practitioner?: {
    name: string;
    title: string;
    photo: string;
  };
  contact: {
    email: string;
    phone?: string;
    address: {
      street: string;
      city: string;
      zip: string;
      country: string;
    };
    mapsLink: string;
  };
  booking?: {
    provider: string;
    url: string;
    embedUrl: string;
  };
  social?: {
    ogImage: string;
  };
}

export interface ApproachCard {
  icon: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ClientContent {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    booking?: string;
    bookingShort?: string;
    contact: string;
    faq?: string;
    language: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta?: string;
    ctaWith?: string;
  };
  approach?: {
    subtitle: string;
    cards: ApproachCard[];
  };
  contact: {
    title: string;
    hours?: string;
    hoursLabel?: string;
    addressLabel?: string;
    emailLabel?: string;
    directionsLabel?: string;
  };
  booking?: {
    title: string;
    subtitle: string;
    fallbackText?: string;
    fallbackLink?: string;
  };
  faq?: {
    title: string;
    items: FaqItem[];
  };
  footer: {
    imprint: string;
    privacy: string;
    copyright: string;
  };
  legal: {
    imprint: {
      title: string;
      content: string;
    };
    privacy: {
      title: string;
      content: string;
    };
  };
}

/**
 * Load client configuration from imported JSON
 */
export function loadConfig(configJson: unknown): ClientConfig {
  return configJson as ClientConfig;
}

/**
 * Create a content getter from imported JSON files
 */
export function createContentLoader(
  deContent: unknown,
  enContent: unknown,
  defaultLocale: Locale = 'de'
) {
  const content: Record<Locale, ClientContent> = {
    de: deContent as ClientContent,
    en: enContent as ClientContent,
  };

  return function getContent(locale: Locale): ClientContent {
    return content[locale] ?? content[defaultLocale];
  };
}

/**
 * Get formatted address from config
 */
export function getFormattedAddress(config: ClientConfig): string {
  const { street, zip, city } = config.contact.address;
  return `${street}, ${zip} ${city}`;
}
