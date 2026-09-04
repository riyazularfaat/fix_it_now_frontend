"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import {
    InputGroupAddon,
    InputGroupButton,
} from "@/components/ui/input-group"
import { LegendField, LegendFieldInput, LegendFieldLegend } from "@/components/ui/legend-field"
import { useActionState } from "react"
import { loginAction } from "../_actions/authActions"


type FormErrors = Partial<Record<"email" | "password" | "form", string>>

export function LoginForm() {
    const [showPassword, setShowPassword] = React.useState(false)
    const [errors, setErrors] = React.useState<FormErrors>({})
    const nextErrors: FormErrors = {}
    // if (!email) {
    //     nextErrors.email = "Email is required."
    // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //     nextErrors.email = "Enter a valid email address."
    // }
    // if (!password) {
    //     nextErrors.password = "Password is required."
    // }
    // setErrors(nextErrors)
    // if (Object.keys(nextErrors).length > 0) return

    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault()

    //     const formData = new FormData(event.currentTarget)
    //     const email = String(formData.get("email") ?? "").trim()
    //     const password = String(formData.get("password") ?? "")

    //     // const nextErrors: FormErrors = {}
    //     // if (!email) {
    //     //     nextErrors.email = "Email is required."
    //     // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //     //     nextErrors.email = "Enter a valid email address."
    //     // }
    //     // if (!password) {
    //     //     nextErrors.password = "Password is required."
    //     // }

    //     // setErrors(nextErrors)
    //     // if (Object.keys(nextErrors).length > 0) return

    //     // startTransition(async () => {
    //     //     const result = await loginAction({ email, password })
    //     //     if (!result.success) {
    //     //         setErrors({ form: result.error })
    //     //         return
    //     //     }
    //     //     toast.success("Welcome back!")
    //     //     router.push("/dashboard")
    //     // })
    // }

    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") ?? "";
    const [state, action, pending] = useActionState(loginAction.bind(null, redirectTo), false);

    // const nextErrors: FormErrors = {}
    // if (!email) {
    //     nextErrors.email = "Email is required."
    // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //     nextErrors.email = "Enter a valid email address."
    // }
    // if (!password) {
    //     nextErrors.password = "Password is required."
    // }

    // setErrors(nextErrors)
    // if (Object.keys(nextErrors).length > 0) return
    React.useEffect(() => {
        if (!state) return;
        if (state.success) {
            toast.success(state.message || "Login successful");
        }
        if (!state.success) {
            toast.error(state.message || "Login failed!");
        }
        
    }, [state])

    return (
        <form action={action} noValidate>
            <FieldGroup>
                {errors.form && (
                    <div
                        role="alert"
                        className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                    >
                        {errors.form}
                    </div>
                )}

                <Field data-invalid={!!errors.email || undefined}>
                    <LegendField>
                        <LegendFieldLegend>Email</LegendFieldLegend>
                        <LegendFieldInput
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            aria-invalid={!!errors.email || undefined}
                            disabled={pending}
                        />
                    </LegendField>
                    <FieldError>{errors.email}</FieldError>
                </Field>

                <Field data-invalid={!!errors.password || undefined}>
                    <div className="flex justify-end">
                        <Link
                            href="/forgot-password"
                            className="text-xs text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <LegendField>
                        <LegendFieldLegend>Password</LegendFieldLegend>
                        <LegendFieldInput
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            aria-invalid={!!errors.password || undefined}
                            disabled={pending}
                        />
                        <InputGroupAddon align="inline-end" className="-mt-1">
                            <InputGroupButton
                                type="button"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <EyeOff /> : <Eye />}
                            </InputGroupButton>
                        </InputGroupAddon>
                    </LegendField>
                    <FieldError>{errors.password}</FieldError>
                </Field>

                <Field orientation="horizontal">
                    <Checkbox id="remember" name="remember" />
                    <FieldLabel htmlFor="remember" className="font-normal">
                        Remember me for 30 days
                    </FieldLabel>
                </Field>

                <Field>
                    <Button type="submit" disabled={pending}>
                        {pending && <Loader2 className="animate-spin" data-icon="inline-start" />}
                        {pending ? "Logging in..." : "Login"}
                    </Button>
                </Field>

                <FieldDescription className="text-center">
                    Don&apos;t have an account? <Link href="/register">Sign up</Link>
                </FieldDescription>
            </FieldGroup>
        </form>
    )
}
