import Image from "next/image"
import Link from "next/link"

export function AuthShell({
    children,
    title,
    subtitle,
}: {
    children: React.ReactNode
    title: string
    subtitle: string
}) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
                <div className="mx-auto w-full max-w-sm flex flex-col items-center text-center">           
                    <span className="flex size-9 rounded-lg text-primary-foreground">
                        <Image
                            src="/logo_blue.png"
                            alt="FixItNow Logo"
                            width={50}
                            height={50}
                            className="justify-center size-9 rounded-lg text-primary-foreground"
                        />
                    </span>

                    <div className="mb-8 flex flex-col gap-1.5">
                        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            {subtitle}
                        </p>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}
