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
      <body className="min-h-screen bg-chalk-canvas text-ink-charcoal antialiased">
        <header className="bg-paper-white shadow-[rgba(40,46,62,0.1)_0px_4px_16px_0px]">
          <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4">
            <Link href="/" className="text-base font-semibold text-iris-bolt">
              Zihin Kalkanı
            </Link>
            <Link
              href="/dersler/yetiskin-1-zihin-nasil-kandirilir"
              className="inline-flex min-h-11 items-center rounded-full bg-iris-bolt px-5 text-sm font-semibold text-white shadow-[rgba(40,46,62,0.1)_0px_2px_4px_0px]"
            >
              Ders 1&apos;e başla
            </Link>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-chalk-canvas">
          <div className="mx-auto max-w-[1200px] px-4 pt-12 pb-8">
            <p className="text-sm font-semibold text-ink-charcoal">Zihin Kalkanı</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-veil">
              Bu kurs manipülasyondan korunmayı öğretir; manipüle etmeyi
              öğretmez. Yazıların sende kalır.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
