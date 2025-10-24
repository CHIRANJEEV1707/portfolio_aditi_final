import Link from 'next/link';

const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/aditiii_a13?igsh=bXIycnp1YWhuNm1p&utm_source=qr',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/aditi-agrawal-700502266?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
  },
  {
    name: 'Pinterest',
    url: 'https://pin.it/5Ld21II1O',
  },
];

const Footer = () => {
  return (
    <footer className="bg-background py-8">
      <div className="container mx-auto text-center text-muted-foreground">
        <div className="flex justify-center gap-6 mb-4">
          {socialLinks.map((social) => (
            <Link href={social.url} key={social.name} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">
              {social.name}
            </Link>
          ))}
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Aditi Agrawal. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
