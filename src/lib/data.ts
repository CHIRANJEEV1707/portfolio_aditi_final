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
    client: 'Courtyard',
    name: 'Courtyard By Marriott',
    imageId: 'project-1',
    description: 'Two cities, one vision, creating digital stories of warmth and hospitality.',
    story: 'Oversaw social media strategy, shoot planning, and content execution for both Raipur and Nashik properties, maintaining Marriott’s premium visual language while capturing local character.The work spanned event coverage, reel creation, festive campaign planning, trendy content ideation, and grid aesthetics to ensure consistent brand presence. Elevated the brand’s online presence through consistent, high-quality content, improved engagement, and unified brand storytelling across both properties.',
    visuals: ['project-1-v1', 'project-1-v2', 'project-1-v3', 'project-1-v4'],
  },
  {
    slug: 'zora-the-mall',
    client: 'Zora',
    name: 'Zora - The Mall',
    imageId: 'project-2',
    description: 'From launch to legacy, building Raipur’s most talked-about mall online.',
    story: 'The brand’s social media presence was built entirely from scratch, leading the digital launch of the mall. Work included overall social media setup, launch campaigns, influencer marketing, shoots, and the creation of CGI reels to introduce the property in an engaging way.The page quickly gained traction with consistent campaigns, event highlights, and community-driven content.Over 3M+ organic views and 11.1K followers achieved within the first few months of launch.',
    visuals: ['project-2-v1', 'project-2-v2', 'project-2-v3', 'project-2-v4'],
  },
  {
    slug: 'hukams-lalit-mahal',
    client: 'Hukam’s Lalit',
    name: 'Hukam’s Lalit Mahal',
    imageId: 'project-3',
    description: 'Where luxury meets legacy, bringing royal elegance to the digital space.',
    story: 'The focus for Hukam’s Lalit Mahal was on establishing a refined and luxurious digital aesthetic. Work included grid curation, the launch of “The Cartier Club”, influencer collaborations, and event promotions that matched the grandeur of the property.The creative process extended beyond social media into magazine development, where content was written, structured, and coordinated with designers to maintain brand voice and sophistication.Additionally, the Privilege Membership Card was conceptualized with attention to visual design, messaging, and client direction.Enhanced the brand’s digital identity with a cohesive luxury aesthetic, strengthened influencer visibility, and created a seamless narrative across print and digital platforms.',
    visuals: ['project-3-v1', 'project-3-v2', 'project-3-v3', 'project-3-v4'],
  },
  {
    slug: 'wasabi',
    client: 'Wasab',
    name: 'Wasabi',
    imageId: 'project-4',
    description: 'Digitally building Raipur’s OG Pan Asian destination!',
    story: "For Wasabi, a lively and trend-led digital presence was built around the restaurant’s youthful energy.The launch included creative reel strategies, employee-generated content, and organic campaigns designed to spark engagement and build community presence.A mix of fun, aesthetic, and timely content helped establish Wasabi’s personality online.Built strong brand awareness through organic viral reach, engaging & Gen-Z content, and a vibrant digital identity that resonated with local audiences.",
    visuals: ['project-4-v1', 'project-4-v2', 'project-4-v3', 'project-4-v4'],
  },
];
