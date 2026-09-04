export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

export type UserProfile = {
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
};

export type AuthResult =
  | { success: true; data: UserProfile }
  | { success: false; data: null };

export type NavbarProps = {
  user: AuthResult;
};

export type AuthActionResult =
  | { success: true }
  | { success: false; error: string };

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};