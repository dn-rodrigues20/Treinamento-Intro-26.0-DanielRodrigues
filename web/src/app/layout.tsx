import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/common/ToastProvider";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Diretoria Jim Carrey - Shop",
  description: "A melhor (e mais duvidosa) loja de times de futebol do Brasil",
  icons: {
    icon: '/icon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${rubik.variable} antialiased`}
      >
        {children}

        <ToastProvider />
      </body>
    </html>
  );
}
