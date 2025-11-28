import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';

// Import the individual settings pages/components
import ProfileSettings from '@/pages/admin/settings/profile';
import PasswordSettings from '@/pages/admin/settings/password';
import AppearanceSettings from '@/pages/admin/settings/appearance';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: 'profile', // Using a local identifier for internal navigation
        icon: null,
    },
    {
        title: 'Password',
        href: 'password', // Using a local identifier
        icon: null,
    },
    {
        title: 'Appearance',
        href: 'appearance', // Using a local identifier
        icon: null,
    },
];

export default function AdminSettingsEdit() {
    const [activeSection, setActiveSection] = useState<string>('profile');

    const renderSection = () => {
        switch (activeSection) {
            case 'profile':
                return <ProfileSettings />;
            case 'password':
                return <PasswordSettings />;
            case 'appearance':
                return <AppearanceSettings />;
            default:
                return <ProfileSettings />;
        }
    };

    return (
        <div className="flex flex-col lg:flex-row lg:space-x-12 p-4">
            <Head title="Admin Settings" /> {/* Head for the modal content */}
            <aside className="w-full max-w-xl lg:w-48">
                <nav className="flex flex-col space-y-1 space-x-0">
                    {sidebarNavItems.map((item) => (
                        <Button
                            key={item.href}
                            size="sm"
                            variant="ghost"
                            asChild
                            className={cn('w-full justify-start', {
                                'bg-muted': activeSection === item.href,
                            })}
                        >
                            <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection(item.href); }}>
                                {item.title}
                            </a>
                        </Button>
                    ))}
                </nav>
            </aside>

            <Separator className="my-6 lg:hidden" />

            <div className="flex-1 md:max-w-2xl">
                <section className="max-w-xl space-y-12">
                    {renderSection()}
                </section>
            </div>
        </div>
    );
}