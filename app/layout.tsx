import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IEP Connect — Parent Advocacy Platform",
  description: "Find certified advocates, track every deadline, keep every record in one secure place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
