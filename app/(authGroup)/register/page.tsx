import { AuthShell } from "@/components/shared/auth-shell"
import type { Metadata } from "next"
import { RegisterForm } from "../_components/register-form"


export const metadata: Metadata = {
    title: "Create account | FixItNow",
    description: "Create a FixItNow account to book services or become a technician.",
}

export default function RegisterPage() {
    return (
        <AuthShell
            title="Create your account"
            subtitle="Join FixItNow to book trusted technicians or start offering your services."
        >
            <RegisterForm />
        </AuthShell>
    )
}
