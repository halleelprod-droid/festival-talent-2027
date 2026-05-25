import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Festival Talent 2027",
  description:
    "Le plus grand rassemblement culturel et créatif nouvelle génération au Sénégal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-black text-white">
        <Navbar />

        {children}
      </body>
    </html>
  );
}