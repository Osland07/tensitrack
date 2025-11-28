import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <img src="/logo.png" alt="Tensitrack Logo" className="h-14 w-auto" />
            <div className="ml-1 grid flex-1 text-left text-xl">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Tensitrack
                </span>
            </div>
        </>
    );
}
