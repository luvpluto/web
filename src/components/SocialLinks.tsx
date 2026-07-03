type SocialLink = {
  label: string;
  href: string;
  icon: JSX.Element;
};

const iconClass = 'h-5 w-5';

const socials: SocialLink[] = [
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M21.6 7.2s-.2-1.6-.8-2.3c-.8-.8-1.7-.8-2.1-.9C15.8 3.8 12 3.8 12 3.8s-3.8 0-6.7.2c-.4.1-1.3.1-2.1.9-.6.7-.8 2.3-.8 2.3S2.2 9.1 2.2 11v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.8 2.3c.8.8 1.8.8 2.3.9 1.7.2 6.5.2 6.5.2s3.8 0 6.7-.2c.4-.1 1.3-.1 2.1-.9.6-.7.8-2.3.8-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8ZM10.1 15.1V8.7l5.9 3.2-5.9 3.2Z"
        />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm4.2 3.2A4.8 4.8 0 1 1 7.2 12 4.8 4.8 0 0 1 12 7.2Zm0 2A2.8 2.8 0 1 0 14.8 12 2.8 2.8 0 0 0 12 9.2Zm5-2.5a1.1 1.1 0 1 1-1.1 1.1A1.1 1.1 0 0 1 17 6.7Z"
        />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com',
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M17.4 6.1a5.1 5.1 0 0 0 3 1v3.2a8 8 0 0 1-4.7-1.5v6.8a6.2 6.2 0 1 1-6.2-6.2c.4 0 .8 0 1.2.1v3.4a2.8 2.8 0 1 0 1.9 2.7V2h3.2a5.1 5.1 0 0 0 1.6 4.1Z"
        />
      </svg>
    ),
  },
  {
    label: 'Discord',
    href: 'https://discord.com',
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M19.2 5.1A15 15 0 0 0 15.5 4l-.5 1a13.4 13.4 0 0 0-4 0l-.5-1a15 15 0 0 0-3.7 1.1C4.5 8.6 3.9 12 4.2 15.3A14.8 14.8 0 0 0 8.7 17.6l.9-1.4c-.5-.2-1-.4-1.4-.7l.3-.2a10.6 10.6 0 0 0 7 0l.3.2c-.5.3-.9.5-1.4.7l.9 1.4a14.8 14.8 0 0 0 4.5-2.3c.4-3.8-.7-7.1-2.6-10.2ZM9.7 13.5c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Zm4.6 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Z"
        />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.5 1.1 3 .9.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.2-4.7-5A3.9 3.9 0 0 1 6.7 7.7a3.6 3.6 0 0 1 .1-2.7s.8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1a3.6 3.6 0 0 1 .1 2.7 3.9 3.9 0 0 1 1.1 2.8c0 3.9-2.4 4.7-4.7 5 .4.3.8 1 .8 2V21c0 .3.2.6.8.5A10 10 0 0 0 12 2Z"
        />
      </svg>
    ),
  },
];

export default function SocialLinks() {
  return (
    <nav className="flex items-center justify-center gap-2.5 sm:gap-3" aria-label="Social links">
      {socials.map((item) => (
        <a
          className="group grid h-8 w-8 place-items-center text-[#ec8aa3] drop-shadow-[0_2px_14px_rgba(236,138,163,0.32)] transition duration-300 hover:-translate-y-1 hover:scale-110 hover:text-[#ffd2dd] sm:h-9 sm:w-9 [&_svg]:h-7 [&_svg]:w-7 sm:[&_svg]:h-8 sm:[&_svg]:w-8"
          href={item.href}
          key={item.label}
          target="_blank"
          rel="noreferrer"
          aria-label={item.label}
          title={item.label}
        >
          {item.icon}
        </a>
      ))}
    </nav>
  );
}
