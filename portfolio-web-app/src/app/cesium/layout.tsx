import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import CesiumNavMenu from "../components/CesiumNavMenu";
import { TerminalProvider } from "../components/TerminalComponents/TerminalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "3D Terrain and Geological Data Visualization Tool | Jacob Kerames",
  description: "",
};

export default function CesiumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <TerminalProvider>
        <CesiumNavMenu />
        <main>
          {children}
        </main>
      </TerminalProvider>
    </div>
  );
}
