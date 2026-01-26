import type { Metadata } from "next";
// import { Inter } from "next/font/google"; // Using a standard font for MVP speed or loading from Google Fonts
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "どうぶつ幸福占い | あなたの隠れ資産を発掘",
    description: "命・卜・相の3系統でおくる本格占い。あなたの強みと経済的ポテンシャルを鑑定します。",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body className="antialiased min-h-screen">
                {children}
            </body>
        </html>
    );
}
