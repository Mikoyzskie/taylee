import type { Metadata } from "next";
import { Kumbh_Sans } from "next/font/google";
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ClerkProvider } from "@clerk/nextjs";

const inter = Kumbh_Sans({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "WorkBodia | Job Finder",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} `}>

          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
