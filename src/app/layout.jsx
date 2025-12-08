import Header from "@/components/Header";
import "./globals.css";
import { Lexend, Red_Rose } from "next/font/google";
import Footer from "@/components/Footer";
const lexend = Lexend({
  variable: "--font-sans",
  subsets: ["latin"],
});

const redRose = Red_Rose({
  variable: "--font-rose",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ticket Order",
  description: "Order your event ticket now",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${lexend.variable} ${redRose.variable} antialiased`}>
        {/* Header */}
        <Header />

        {/* Content */}
        {children}

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
