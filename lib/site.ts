// Site-wide settings and navigation. Edit menu labels and links here.

export const site = {
  name: 'Financial Transparency Coalition',
  shortName: 'FTC',
  description:
    'An international coalition of civil society organisations working for financial transparency.',
  // Set NEXT_PUBLIC_SITE_URL in the hosting provider for production.
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://financialtransparency.org',
  // While this is "true" the site asks search engines not to index it (preview).
  isPreview: process.env.NEXT_PUBLIC_PREVIEW !== 'false',
  contactEmail: 'info@financialtransparency.org',
};

export type NavLink = { label: string; href: string; desc?: string };
export type NavMenu = { id: string; label: string; intro: string; links: NavLink[] };

export const mainMenu: NavMenu[] = [
  {
    id: 'about',
    label: 'About us',
    intro:
      'An international coalition of civil society organisations that sees transparency as a transformative force.',
    links: [
      { label: 'Who we are', href: '/about/', desc: 'Vision, mission and approach' },
      { label: 'Strategy 2026–2030', href: '/about/strategy/', desc: 'Ending the era of secrecy' },
      { label: 'Members and allies', href: '/about/members/', desc: 'Organisations across the Global South and North' },
      { label: 'Secretariat and governance', href: '/about/secretariat/', desc: 'Team, board and how decisions are made' },
    ],
  },
  {
    id: 'work',
    label: 'Our work',
    intro: 'Research and advocacy organised around the ABC-DEFG of financial transparency.',
    links: [
      { label: 'Global Charter (ABC-DEFG)', href: '/our-work/global-charter/', desc: 'Seven pillars of financial transparency' },
      { label: "People's Fiscal Monitor", href: '/our-work/peoples-fiscal-monitor/', desc: 'Transparency to fund care and social protection' },
      { label: 'Financial Secrets of Natural Resources', href: '/our-work/financial-secrets-of-natural-resources/', desc: 'Illicit flows in fisheries, forestry and mining' },
      { label: 'Rights-Based Economy', href: '/our-work/rights-based-economy/', desc: 'Economic policy from a human rights perspective' },
      { label: 'Global advocacy', href: '/our-work/global-advocacy/', desc: 'UN Tax Convention, IMF and World Bank, FfD and more' },
    ],
  },
  {
    id: 'latest',
    label: 'Latest',
    intro: 'News, statements and events from the coalition and its members.',
    links: [
      { label: 'News', href: '/news/', desc: 'Statements, analysis and updates' },
      { label: 'Events', href: '/events/', desc: 'Upcoming and past events' },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    intro: 'Reports, briefings and materials to use in research and advocacy.',
    links: [
      { label: 'Publications', href: '/publications/', desc: 'Reports, studies and policy briefs' },
      { label: 'Briefings and submissions', href: '/publications/?type=briefing', desc: 'Positions to international processes' },
      { label: 'Newsletter', href: '/newsletter/', desc: 'Subscribe and read past editions' },
    ],
  },
];
