import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zihin Kalkanı — Manipülasyona Karşı Eleştirel Düşünme",
  description:
    "Manipülasyon tekniklerini ismiyle tanımak, karar vermeden önce durup düşünmek ve kendi değerlerinle karar vermek için bireysel, çevrimiçi bir kurs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-white text-zinc-900 antialiased">
        <header className="border-b border-zinc-200">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-lg font-bold tracking-tight">
              Zihin Kalkanı
            </Link>
            <Link
              href="/dersler/yetiskin-1-zihin-nasil-kandirilir"
              className="inline-flex min-h-11 items-center rounded-lg bg-zinc-900 px-4 text-sm font-semibold text-white"
            >
              Ders 1&apos;e başla
            </Link>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-zinc-200">
          <div className="mx-auto max-w-3xl px-4 py-6 text-sm text-zinc-600">
            <p>
              Bu kurs manipülasyondan korunmayı öğretir; manipüle etmeyi
              öğretmez. Yazıların sende kalır.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
