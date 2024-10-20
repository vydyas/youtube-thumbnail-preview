import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Youtube Thumbnail Preview | Youtube Thumbnail Tester",
  description:
    "Test and preview your video thumbnail designs for YouTube. Ensure your content stands out and attracts viewers with our easy-to-use and customizable tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-XY4H2C61EY`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XY4H2C61EY');
          `}
        </Script>
        <Script
          defer
          data-website-id="67077c800a52037e0fc2f48c"
          data-domain="formatjson.io"
          src="https://datafa.st/js/script.js"
        ></Script>
        {children}
      </body>
    </html>
  );
}
