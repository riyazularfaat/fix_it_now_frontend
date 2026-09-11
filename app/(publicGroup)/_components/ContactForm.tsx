/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import * as React from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import {
    LegendField,
    LegendFieldInput,
    LegendFieldLegend,
} from "@/components/ui/legend-field"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useActionState, useEffect } from "react"
import { ContactState, sendContactAction } from "../_actions/contactActions"

type ContactReason = "project" | "general" | "press"

type FormErrors = Partial<
Record < "name" | "email" | "message" | "form", string >
>

const initialState: ContactState = {
    success: false,
    message: "",
}

export function ContactForm() {
    const [reason, setReason] = React.useState<ContactReason>("project")
    const [errors, setErrors] = React.useState<FormErrors>({})

    const [state, action, pending] = useActionState(sendContactAction, initialState)
    const formRef = React.useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (!state) return
        if (state.success) {
            toast.success(state.message || "Message sent")
            formRef.current?.reset()
            setReason("project")
        } else if (state.message) {
            toast.error(state.message)
        }
    }, [state])

    const validateForm = (form: HTMLFormElement) => {
        const formData = new FormData(form)
        const name = String(formData.get("name") ?? "").trim()
        const email = String(formData.get("email") ?? "").trim()
        const message = String(formData.get("message") ?? "").trim()
        const nextErrors: FormErrors = {}

        if (!name || name.length < 2) nextErrors.name = "Enter your name."
        if (!email) nextErrors.email = "Email is required."
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            nextErrors.email = "Enter a valid email address."
        }
        if (!message || message.length < 10) {
            nextErrors.message = "Say a little more — at least 10 characters."
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

                <Field data-invalid={!!errors.name || undefined}>
                    <LegendField>
                        <LegendFieldLegend className="text-sm font-medium light:text-black/70">
                            Full name
                        </LegendFieldLegend>
                        <LegendFieldInput
                            id="name"
                            className="light:text-black"
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Jordan Lee"
                            aria-invalid={!!errors.name || undefined}
                            disabled={pending}
                        />
                    </LegendField>
                    <FieldError>{errors.name}</FieldError>
                </Field>

                <Field data-invalid={!!errors.email || undefined}>
                    <LegendField>
                        <LegendFieldLegend className="light:text-black/70">Email</LegendFieldLegend>
                        <LegendFieldInput
                            id="email"
                            className="light:text-black"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="jordan@company.com"
                            aria-invalid={!!errors.email || undefined}
                            disabled={pending}
                        />
                    </LegendField>
                    <FieldError>{errors.email}</FieldError>
                </Field>

                <Field>
                    <FieldLabel htmlFor="reason-toggle" className="light:text-black">What&apos;s this about</FieldLabel>
                    <ToggleGroup
                        id="reason-toggle"
                        type="single"
                        value={reason}
                        onValueChange={(value) => {
                            if (value) setReason(value as ContactReason)
                        }}
                        variant="outline"
                        className="w-full"
                    >
                        <ToggleGroupItem value="project" className="flex-1 focus:text-white">
                            Project
                        </ToggleGroupItem>
                        <ToggleGroupItem value="general" className="flex-1 focus:text-white">
                            General
                        </ToggleGroupItem>
                        <ToggleGroupItem value="press" className="flex-1 focus:text-white">
                            Press
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <input type="hidden" name="reason" value={reason} />
                </Field>

                <Field data-invalid={!!errors.message || undefined}>
                    <FieldLabel htmlFor="message">Message</FieldLabel>
                    <Textarea
                        id="message"
                        name="message"
                        placeholder="What are you working on?"
                        className="min-h-32 resize-none"
                        aria-invalid={!!errors.message || undefined}
                        disabled={pending}
                    />
                    <FieldError>{errors.message}</FieldError>
                </Field>

                <Field>
                    <Button type="submit" disabled={pending}>
                        {pending && <Loader2 className="animate-spin" data-icon="inline-start" />}
                        {pending ? "Sending..." : "Send message"}
                    </Button>
                </Field>

                <FieldDescription className="text-center">
                    We usually reply within one business day.
                </FieldDescription>
            </FieldGroup>
        </form>
    )
}