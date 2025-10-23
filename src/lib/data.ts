export type Project = {
  slug: string;
  client: string;
  name: string;
  imageId: string;
  description: string;
  story: string;
  visuals: string[];
};

export const projects: Project[] = [
  {
    slug: 'courtyard-by-marriott',
    client: 'Courtyard By Marriott',
    name: 'Courtyard By Marriott',
    imageId: 'project-1',
    description: 'A complete brand overhaul for a rising star in the beauty industry, focusing on a bold, confident, and modern aesthetic.',
    story: 'Aura Beauty approached us with a challenge: their existing brand felt dated and failed to connect with their target Gen-Z audience. We conducted a deep dive into market trends and user personas to craft a new brand identity that was both authentic and aspirational. The project involved a new logo, color palette, typography system, and a comprehensive social media strategy. The result was a 200% increase in engagement and a significant boost in online sales.',
    visuals: ['project-1-v1', 'project-1-v2'],
  },
  {
    slug: 'zora-the-mall',
    client: 'Zora - The Mall',
    name: 'Zora - The Mall',
    imageId: 'project-2',
    description: 'A targeted digital campaign that turned a boutique travel agency into a viral sensation among young adventurers.',
    story: 'Nomad Nook wanted to increase bookings for their unique, off-the-beaten-path travel packages. We developed the "Viral Voyage" campaign, leveraging influencer partnerships and user-generated content on TikTok and Instagram. By creating a compelling narrative around adventure and discovery, we inspired thousands to share their own travel stories, leading to a 5x growth in website traffic and a fully booked season.',
    visuals: ['project-2-v1', 'project-2-v2'],
  },
  {
    slug: 'hukams-lalit-mahal',
    client: 'Hukam’s Lalit Mahal',
    name: 'Hukam’s Lalit Mahal',
    imageId: 'project-3',
    description: 'Developing a sustainable growth strategy for an organic food company through content marketing and community building.',
    story: 'GreenLeaf Organics had a fantastic product but struggled to communicate their values to a wider audience. Our strategy focused on content marketing, creating a blog and video series that educated consumers on the benefits of organic farming and sustainable living. We built a strong online community around the brand, fostering loyalty and turning customers into brand advocates. This approach led to a 75% growth in their customer base within a year.',
    visuals: ['project-3-v1', 'project-3-v2'],
  },
  {
    slug: 'wasabi',
    client: 'Wasabi',
    name: 'Wasabi',
    imageId: 'project-4',
    description: 'Launching a groundbreaking tech product with a multi-channel digital strategy that generated massive pre-order excitement.',
    story: "For the launch of TechSphere's flagship product, we orchestrated a multi-faceted digital campaign that built anticipation and excitement. The strategy included a teaser video series, a PR push with major tech publications, and an early-access program for tech enthusiasts. The campaign culminated in a sold-out pre-order phase and established TechSphere as a major innovator in the market.",
    visuals: ['project-4-v1', 'project-4-v2'],
  },
];
