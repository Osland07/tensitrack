// resources/js/layouts/public-layout.tsx
import React, { PropsWithChildren } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { dashboard, login, register } from '@/routes'; // Assuming these are still used
import { Footer2 } from '@/components/footer2';
import Navbar from '@/components/navbar';

interface PublicLayoutProps extends PropsWithChildren {
    title?: string;
    canRegister?: boolean; // Passed from the welcome controller
    hideFooter?: boolean; // New prop
}

export default function PublicLayout({ children, title, canRegister = true, hideFooter = false }: PublicLayoutProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title={title ? title : 'Welcome'} />
            <div className="flex min-h-screen flex-col bg-background text-foreground">
                {/* Navbar */}
                <Navbar canRegister={canRegister} />

                {/* Main Content */}
                <main className="flex-grow">
                    {children}
                </main>

                {/* Footer */}
                {!hideFooter && <Footer2 />} {/* Conditional rendering */}
            </div>
        </>
    );
}