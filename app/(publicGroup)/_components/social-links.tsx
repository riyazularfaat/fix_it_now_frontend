import Link from "next/link"

type SocialLink = {
    name: string
    href: string
    color: string
    icon: React.ReactNode
}

const socialLinks: SocialLink[] = [
    {
        name: "Facebook",
        href: "https://facebook.com/kilnstudio",
        color: "#1877F2",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.81 8.44-4.94 8.44-9.94Z" />
            </svg>
        ),
    },
    {
        name: "Instagram",
        href: "https://instagram.com/kilnstudio",
        color: "#E4405F",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com/company/kilnstudio",
        color: "#0A66C2",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-.98 1.83-2 3.77-2 4.03 0 4.78 2.55 4.78 5.87V21h-4v-5.5c0-1.31-.02-3-1.85-3-1.86 0-2.14 1.4-2.14 2.9V21h-4V9Z" />
            </svg>
        ),
    },
    {
        name: "X",
        href: "https://x.com/kilnstudio",
        color: "#000000",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.24 2.75h3.03l-6.62 7.56 7.79 10.94h-6.1l-4.78-6.6-5.47 6.6H2.05l7.08-8.55L1.65 2.75h6.26l4.32 6.03 6.01-6.03Zm-1.06 16.6h1.68L7.02 4.53H5.2l11.98 14.82Z" />
            </svg>
        ),
    },
    {
        name: "YouTube",
        href: "https://youtube.com/@kilnstudio",
        color: "#FF0000",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M21.8 8.4s-.2-1.5-.8-2.2c-.8-.8-1.7-.8-2.1-.9C15.9 5.1 12 5.1 12 5.1h-.01s-3.89 0-6.9.2c-.4.1-1.3.1-2.1.9-.6.7-.8 2.2-.8 2.2S2 10.2 2 12v1.6c0 1.8.2 3.6.2 3.6s.2 1.5.8 2.2c.8.8 1.85.8 2.32.9 1.68.16 7.13.2 7.68.2h.01s3.9 0 6.91-.2c.4-.1 1.3-.1 2.1-.9.6-.7.8-2.2.8-2.2s.2-1.8.2-3.6V12c0-1.8-.2-3.6-.2-3.6ZM9.98 15.5v-6l5.4 3-5.4 3Z" />
            </svg>
        ),
    },
]

export function SocialLinks() {
    return (
        <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
                <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#1C1B19]/12 text-[#1C1B19]/60 transition-colors hover:border-(--brand) hover:text-(--brand)"
                    style={{ "--brand": social.color } as React.CSSProperties}
                >
                    <span className="h-4 w-4">{social.icon}</span>
                </Link>
            ))}
        </div>
    )
}