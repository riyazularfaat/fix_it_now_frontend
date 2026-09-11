"use server";

export type ContactState = {
  success: boolean;
  message: string;
};

export async function sendContactAction(
  prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const reason = String(formData.get("reason") ?? "");
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { success: false, message: "Please fill in all required fields." };
  }

  try {
    // Replace with your own email service, API call, or DB write.
    console.log({ name, email, reason, message });

    return {
      success: true,
      message: "Message sent — we'll get back to you soon.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
