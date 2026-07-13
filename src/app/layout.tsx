import type { Metadata } from "next";
import { Space_Grotesk, Sora, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "TECHFEST 2026 | Future of Technology Odyssey",
  description: "The ultimate 3D interactive cyberpunk tech festival. Deep dive into quantum systems, autonomous robotics, and synthetic intelligence.",
  keywords: ["TechFest", "Quantum Computing", "AI", "Robotics", "3D Web", "WebGL", "Space Travel", "Hackathon"],
  authors: [{ name: "TechFest Controllers" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${sora.variable} ${inter.variable}`}
    >
      <body className="antialiased overflow-x-hidden bg-[#060B24]">
        {/* Film grain noise mesh */}
        <div className="noise-overlay" />
        
        {children}
      </body>
    </html>
  );
}
