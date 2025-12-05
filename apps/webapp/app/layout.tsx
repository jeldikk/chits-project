import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@aws-amplify/ui-react/styles.css";
import AmplifyProvider from "@/context/amplify.context";
import AuthDetailsContextProvider from "@/context/auth-details.context";
import Header from "@/components/header/header.component";
import { getAuthUserDetails } from "@/utils/amplify.server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cheeti Paata Records",
  description: "App to Manage your Cheeti records with Prediction",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authDetails = await getAuthUserDetails();
  console.log({ authDetails });
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AmplifyProvider>
          <AuthDetailsContextProvider authDetails={authDetails}>
            <Header />
            {children}
          </AuthDetailsContextProvider>
        </AmplifyProvider>
      </body>
    </html>
  );
}
