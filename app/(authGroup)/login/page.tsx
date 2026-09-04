import { AuthShell } from "@/components/shared/auth-shell"
import type { Metadata } from "next"
import { LoginForm } from "../_components/login-form"


export const metadata: Metadata = {
    title: "Sign in | FixItNow",
    description: "Sign in to your FixItNow account to book or manage services.",
}

export default function LoginPage() {
    return (
        <AuthShell
            title="Welcome back"
            subtitle="Sign in to book a service or manage your jobs."
        >
            <LoginForm />
        </AuthShell>
    )
}
