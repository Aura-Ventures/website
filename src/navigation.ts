import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Homes',
      links: [
        {
          text: 'Problems',
          href: getPermalink('/#problems'),
        },
        {
          text: 'Features',
          href: getPermalink('/#features'),
        },
        {
          text: 'FAQs',
          href: getPermalink('/#faqs'),
        },
      ],
    },
    {
      text: 'About Us',
      href: 'https://docs.auraofhope.com/about-us',
      target: '_blank',
    },
    {
      text: 'Statement of Faith',
      href: 'https://docs.auraofhope.com/statement-of-faith',
      target: '_blank',
    },
    {
      text: 'Contact Us',
      // href: 'mailto:auraprayerapp@gmail.com',
      href: 'mailto:support@auraofhope.com',
    },
  ],
  actions: [
    {
      text: 'Download',
      href: 'https://apps.apple.com/us/app/aura-personal-bible-prayer/id6736381898',
      target: '_blank',
    },
  ],
};

export const footerData = {
  links: [],
  secondaryLinks: [
    {
      text: 'Terms',
      href: 'https://docs.auraofhope.com/service/terms-and-conditions',
    },
    {
      text: 'Privacy Policy',
      href: 'https://docs.auraofhope.com/service/privacy-policy',
    },
  ],
  socialLinks: [],
  footNote: '',
};
