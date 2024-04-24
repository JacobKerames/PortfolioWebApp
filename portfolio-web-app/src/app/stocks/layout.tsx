import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TerminalProvider } from "../components/TerminalComponents/TerminalContext";
import "../globals.css";
import StocksNavMenu from "../components/StocksNavMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jacob Kerames | Software Engineer",
  description: "",
};

export default function StocksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <TerminalProvider>
				<StocksNavMenu />
        <main>
          {children}
        </main>
      </TerminalProvider>
    </div>
  );
}
