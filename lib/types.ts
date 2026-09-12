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

export type ActiveStatus = "ACTIVE" | "BLOCKED" | "DEACTIVATED";

export type VerificationStatus = "PENDING" | "VERIFIED" | "REJECTED";

export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type PriceType = "FIXED" | "HOURLY";

export type ServiceStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "PENDING"
  | "ARCHIVED"
  | "DELETED";
export interface ICategory {
  id: string;
  name: string;
  description?: string | null;
  iconUrl?: string | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IService {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  duration: number;
  priceType: PriceType;
  currency?: string;
  categoryId: string;
  category: ICategory;
  technicianId?: string;
  technician?: ITechnicianSummary;
  serviceStatus?: boolean;
  createdAt?: string;
}

export interface ITechnicianSummary {
  id: string;
  userId?: string;
  name?: string;
  email?: string;
  avatarUrl?: string | null;
  bio?: string | null;
  skills?: string[];
  hourlyRate?: number;
  yearsExperience?: number;
  isVerified?: VerificationStatus;
  rating?: number;
  reviewCount?: number;
  photoUrl?: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode?: number;
  message?: string;
  data?: T;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedData<T> {
  data: T[];
  meta: PaginationMeta;
}