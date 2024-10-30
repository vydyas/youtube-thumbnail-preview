import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { MobileWarning } from "@/components/mobile-warning";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
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
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta
            name="google-site-verification"
            content="vzSOXA6_hIFFn-xxiSVc9lAI04t1CMe71Iulykr5l9w"
          />
        </head>
        <body className={`${poppins.variable} font-poppins`}>
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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <MobileWarning />

            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
