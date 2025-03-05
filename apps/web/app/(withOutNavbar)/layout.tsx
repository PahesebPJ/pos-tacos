export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="container-layout" id="root">
            {children}
        </div>
    );
}
