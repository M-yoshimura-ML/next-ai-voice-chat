import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";
import MenuContextProvider, { MenuContext } from "@/context/MenuContext";
import { AuthProvider } from "@/context/AuthContext";
import { SettingsProvider } from "@/context/SettingsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Voice Chat",
  description: "AI Speak application with OpenAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <SettingsProvider>
            <MenuContextProvider>
              <MainLayout>
                {children}
              </MainLayout>
            </MenuContextProvider>
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
