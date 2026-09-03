export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

export type UserProfile = {
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
};

export type AuthResult =
  | { success: true; data: { profile: UserProfile } }
  | { success: false; data: null };

export type NavbarProps = {
  user: AuthResult;
};
