import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Script from "next/script";
import ScrollToTop from "@/components/common/ToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shaheed Sharif Osman Hadi | শহীদ শরীফ ওসমান হাদি",
  description:
    "Official photo and video memorial archive of Sharif Osman Hadi (1993–2025). Explore the legacy, political struggle, and speeches of the Inqilab Moncho spokesperson and July Revolution martyr. | শরীফ ওসমান বিন হাদির অফিসিয়াল মেমোরিয়াল আর্কাইভ। ইনকিলাব মঞ্চের মুখপাত্র ও জুলাই বিপ্লবের শহিদের জীবন, সংগ্রাম, সচিত্র ইতিহাস, দুর্লভ ছবি ও ভিডিওর এক অনন্য ডিজিটাল সংগ্রহশালা।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="Shaheed Sharif Osman Hadi | শহীদ শরীফ ওসমান হাদি"
        />
        <meta
          property="og:description"
          content="Official photo and video memorial archive of Sharif Osman Hadi (1993–2025). Explore the legacy, political struggle, and speeches of the Inqilab Moncho spokesperson and July Revolution martyr. | শরীফ ওসমান বিন হাদির অফিসিয়াল মেমোরিয়াল আর্কাইভ। ইনকিলাব মঞ্চের মুখপাত্র ও জুলাই বিপ্লবের শহিদের জীবন, সংগ্রাম, সচিত্র ইতিহাস, দুর্লভ ছবি ও ভিডিওর এক অনন্য ডিজিটাল সংগ্রহশালা।"
        />
        <meta
          property="og:url"
          content="https://sharif-osman-hadi.netlify.app/"
        />
        <meta property="og:site_name" content="Shaheed Sharif Osman Hadi" />
        <meta name="author" content="Md Abdus Sabur" />
        <meta
          name="google-site-verification"
          content="OXdTLL2O2NCE16NaL1Cc3Z8fVYY8XAS0hEMLB-C9fyY"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Z92K7M592D"
          strategy="beforeInteractive"
        />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z92K7M592D');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
