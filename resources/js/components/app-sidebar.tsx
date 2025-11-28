import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, AlertTriangle, ListChecks, Gavel, History, Users } from 'lucide-react'; // Added Users icon
import AdminRiskLevelController from '@/actions/App/Http/Controllers/Admin/AdminRiskLevelController';
import AdminRiskFactorController from '@/actions/App/Http/Controllers/Admin/AdminRiskFactorController';
import AdminRuleController from '@/actions/App/Http/Controllers/Admin/AdminRuleController';
import AdminScreeningHistoryController from '@/actions/App/Http/Controllers/Admin/AdminScreeningHistoryController';
import AdminRoleController from '@/actions/App/Http/Controllers/Admin/AdminRoleController'; // Import AdminRoleController
import AdminUserController from '@/actions/App/Http/Controllers/Admin/AdminUserController'; // Import AdminUserController
import AdminPermissionController from '@/actions/App/Http/Controllers/Admin/AdminPermissionController'; // Import AdminPermissionController
import AdminDashboardController from '@/actions/App/Http/Controllers/Admin/AdminDashboardController'; // Import AdminDashboardController

import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: AdminDashboardController.index.url(),
        icon: LayoutGrid,
    },
    {
        title: 'Manajemen Peran',
        href: AdminRoleController.index.url(),
        icon: Users,
        permission: 'roles.view',
    },
    {
        title: 'Manajemen Izin',
        href: AdminPermissionController.index.url(),
        icon: Folder,
        permission: 'permissions.view',
    },
    {
        title: 'Manajemen Pengguna',
        href: AdminUserController.index.url(),
        icon: Users,
        permission: 'users.view',
    },
    {
        title: 'Tingkat Risiko',
        href: AdminRiskLevelController.index.url(),
        icon: AlertTriangle,
        permission: 'risk-levels.view',
    },
    {
        title: 'Faktor Risiko',
        href: AdminRiskFactorController.index.url(),
        icon: ListChecks,
        permission: 'risk-factors.view',
    },
    {
        title: 'Rules', // New item
        href: AdminRuleController.index.url(),
        icon: Gavel, // Icon for rules
        permission: 'rules.view',
    },
    {
        title: 'Riwayat Skrining',
        href: AdminScreeningHistoryController.index.url(),
        icon: History,
        permission: 'screening-history.view',
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
