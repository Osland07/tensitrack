// resources/js/components/navbar.tsx
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { type SharedData } from '@/types';
import { dashboard, login, register, logout } from '@/routes';
import ClientScreeningController from '@/actions/App/Http/Controllers/Client/ClientScreeningController';
import ClientProfileController from '@/actions/App/Http/Controllers/Client/ClientProfileController';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Logo, LogoImage, LogoText } from "@/components/logo";

export default function Navbar({ canRegister = true }: { canRegister?: boolean; }) {
    const { auth } = usePage<SharedData>().props;

    const layananLinks: { title: string; href: string }[] = [
        { title: "Kalkulator BMI", href: "#kalkulator-bmi" },
        { title: "Skrining Mandiri", href: "#diagnosis" },
    ];

    const riwayatLinks: { title: string; href: string }[] = [
        { title: "Profil Saya", href: ClientProfileController.index.url() },
        { title: "Riwayat Skrining", href: ClientScreeningController.index.url() },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-primary text-secondary">
            <div className="container mx-auto flex h-20 items-center justify-between">
                {/* Left side: Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <Logo asChild>
                        <LogoImage src="/logo.png" alt="Tensitrack Logo" className="h-10" />
                        <LogoText className="text-xl font-bold">Tensitrack</LogoText>
                    </Logo>
                </Link>

                {/* Middle: Desktop Nav Links */}
                <nav className="hidden md:flex">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/" className="inline-flex h-10 items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-bold text-secondary transition-colors hover:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                                    Beranda
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent text-secondary hover:text-white data-[state=open]:text-white text-base font-bold">Layanan</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[200px] gap-1 p-2">
                                        {layananLinks.map((link) => (
                                            <li key={link.title}>
                                                <NavigationMenuLink asChild>
                                                    <Link href={link.href} className="font-bold block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                        {link.title}
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="#alur-kerja" className="inline-flex h-10 items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-bold text-secondary transition-colors hover:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                                    Alur Kerja
                                </Link>
                            </NavigationMenuItem>
                            {auth.user && (
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-transparent text-secondary hover:text-white data-[state=open]:text-white text-base font-bold">Riwayat</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[200px] gap-1 p-2">
                                            {riwayatLinks.map((link) => (
                                                <li key={link.title}>
                                                    <NavigationMenuLink asChild>
                                                        <Link href={link.href} className="font-bold block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                            {link.title}
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            )}
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>

                {/* Right side: Auth links and Mobile trigger */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-4">
                        {auth.user ? (
                            <>
                                <Button variant="secondary" asChild className="font-bold">
                                    <Link href={ClientProfileController.index.url()}>Profil Saya</Link>
                                </Button>
                                <Button variant="secondary" asChild className="font-bold">
                                    <Link href={logout()} method="post" as="button">Logout</Link>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href={login()} className="inline-flex h-10 items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-bold text-secondary transition-colors hover:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                                    Login
                                </Link>
                                {canRegister && (
                                    <Link href={register()} className="inline-flex h-10 items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-bold text-secondary transition-colors hover:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                                        Register
                                    </Link>
                                )}
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Trigger */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle Menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <nav className="grid gap-6 text-lg font-medium">
                                    <Link
                                        href="/"
                                        className="flex items-center gap-2 text-lg font-semibold"
                                    >
                                        <LogoImage src="/logo.png" alt="Tensitrack Logo" className="h-8" />
                                        <span className="sr-only">Tensitrack</span>
                                    </Link>
                                    <Link href="#beranda" className="hover:text-foreground">Beranda</Link>
                                    <Link href="#layanan" className="hover:text-foreground">Layanan</Link>
                                    <Link href="#alur-kerja" className="hover:text-foreground">Alur Kerja</Link>
                                    {auth.user && (
                                        <>
                                            <Link href={ClientProfileController.index.url()} className="hover:text-foreground">Profil Saya</Link>
                                            <Link href={ClientScreeningController.index.url()} className="hover:text-foreground">Riwayat Skrining</Link>
                                            <Link href={logout()} method="post" as="button" className="hover:text-foreground">Logout</Link>
                                        </>
                                    )}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}