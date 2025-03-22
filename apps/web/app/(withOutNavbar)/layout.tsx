import { CounterPersonProvider } from "../context/PersonProvider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <CounterPersonProvider>
            <div className="container-layout" id="root">
                {children}
            </div>
        </CounterPersonProvider>
    );
}
