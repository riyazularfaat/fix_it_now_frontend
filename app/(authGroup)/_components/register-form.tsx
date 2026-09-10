"use client"

import * as React from "react"
import Link from "next/link"
import { toast } from "sonner"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import type { UserRole } from "@/lib/types"
import { Button } from "@/components/ui/button"
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
import {
    LegendField,
    LegendFieldInput,
    LegendFieldLegend,
} from "@/components/ui/legend-field"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { registerAction, RegisterState } from "../_actions/authActions"
import { useActionState, useEffect } from "react"

type FormErrors = Partial<
    Record<"name" | "email" | "password" | "confirmPassword" | "form", string>
    >

const initialState: RegisterState = {
    success: false,
    message: "",
};

export function RegisterForm() {
    const [showPassword, setShowPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [role, setRole] = React.useState<UserRole>("CUSTOMER")
    const [errors, setErrors] = React.useState<FormErrors>({})

    const [state, action, pending] = useActionState(registerAction, initialState)
    const formRef = React.useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (!state) return
        if (state.success) {
            toast.success(state.message || "Registration successful")
            formRef.current?.reset()
        } else {
            toast.error(state.message || "Registration failed!")
        }
    }, [state])

    const validateForm = (form: HTMLFormElement) => {
        const formData = new FormData(form)
        const name = String(formData.get("name") ?? "").trim()
        const email = String(formData.get("email") ?? "").trim()
        const password = String(formData.get("password") ?? "")
        const confirmPassword = String(formData.get("confirmPassword") ?? "")
        const nextErrors: FormErrors = {}

        if (!name) nextErrors.name = "Full name is required."
        if (!email) nextErrors.email = "Email is required."
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            nextErrors.email = "Enter a valid email address."
        }
        if (!password) nextErrors.password = "Password is required."
        else if (password.length < 8) {
            nextErrors.password = "Password must be at least 8 characters."
        }
        if (confirmPassword !== password) {
            nextErrors.confirmPassword = "Passwords do not match."
        }

        setErrors(nextErrors)
        return Object.keys(nextErrors).length === 0
    }


    return (
        <form
            ref={formRef}
            action={action}
            onSubmit={(event) => {
                if (!validateForm(event.currentTarget)) event.preventDefault()
            }}
            noValidate
        >
            <FieldGroup>
                {errors.form && (
                    <div
                        role="alert"
                        className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                    >
                        {errors.form}
                    </div>
                )}

                <Field>
                    <FieldLabel htmlFor="role-toggle">I want to</FieldLabel>
                    <ToggleGroup
                        id="role-toggle"
                        type="single"
                        value={role}
                        onValueChange={(value) => {
                            if (value) setRole(value as UserRole)
                        }}
                        variant="outline"
                        className="w-full"
                    >
                        <ToggleGroupItem value="CUSTOMER" className="flex-1">
                            Book services
                        </ToggleGroupItem>
                        <ToggleGroupItem value="TECHNICIAN" className="flex-1">
                            Offer services
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <input type="hidden" name="role" value={role} />
                </Field>

                <Field data-invalid={!!errors.name || undefined}>
                    <LegendField>
                        <LegendFieldLegend>Full name</LegendFieldLegend>
                        <LegendFieldInput
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Jordan Rivera"
                            aria-invalid={!!errors.name || undefined}
                            disabled={pending}
                        />
                    </LegendField>
                    <FieldError>{errors.name}</FieldError>
                </Field>

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
                    <LegendField>
                        <LegendFieldLegend>Password</LegendFieldLegend>
                        <LegendFieldInput
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="At least 8 characters"
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

                <Field data-invalid={!!errors.confirmPassword || undefined}>
                    <LegendField>
                        <LegendFieldLegend>Confirm password</LegendFieldLegend>
                        <LegendFieldInput
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="Re-enter your password"
                            aria-invalid={!!errors.confirmPassword || undefined}
                            disabled={pending}
                        />
                        <InputGroupAddon align="inline-end" className="-mt-1">
                            <InputGroupButton
                                type="button"
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                            >
                                {showConfirmPassword ? <EyeOff /> : <Eye />}
                            </InputGroupButton>
                        </InputGroupAddon>
                    </LegendField>
                    <FieldError>{errors.confirmPassword}</FieldError>
                </Field>

                <Field>
                    <Button type="submit" disabled={pending}>
                        {pending && <Loader2 className="animate-spin" data-icon="inline-start" />}
                        {pending ? "Creating account..." : "Sign Up"}
                    </Button>
                </Field>

                <FieldDescription className="text-center">
                    Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
            </FieldGroup>
        </form>
    )
}
