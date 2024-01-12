import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TerminalProvider } from "./components/TerminalComponents/TerminalContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jacob Kerames | Software Engineer",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TerminalProvider>{children}</TerminalProvider>
      </body>
    </html>
  );
}
