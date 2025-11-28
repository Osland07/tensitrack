import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

// New interfaces for Screening History
export interface Paginator<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    per_page: number; // Added per_page property
}

// Define RiskLevel interface
export interface RiskLevel {
    id: number;
    code: string;
    name: string;
    description: string;
    suggestion: string;
    created_at: string;
    updated_at: string;
}

export interface ScreeningHistoryType {
    id: number;
    user: User;
    screening_date: string;
    weight: number;
    height: number;
    bmi: number;
    screening_result: string | null;
    answer_options: Record<string, string> | null;
    created_at: string; // Add created_at
    updated_at: string; // Add updated_at
    risk_level?: RiskLevel; // Added optional risk_level
}
