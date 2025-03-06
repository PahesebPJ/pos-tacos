import NavBar from '@/app/components/NavBar';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="container-layout">
            <NavBar />
            {children}
        </div>
    );
}
