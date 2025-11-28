import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';

export default function Appearance() {
    return (
        <div className="space-y-6">
            <Head title="Appearance settings" /> {/* Keep Head here to set title for the modal content */}

            <HeadingSmall
                title="Appearance settings"
                description="Update your account's appearance settings"
            />
            <AppearanceTabs />
        </div>
    );
}