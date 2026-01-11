import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@aws-amplify/ui-react/styles.css";
import "./globals.css";

import AmplifyProvider from "@/context/amplify.context";
import AuthDetailsContextProvider from "@/context/auth-details.context";
import Header from "@/components/header/header.component";
import { getAuthUserDetails } from "@/utils/amplify.server";
import StoreProvider from "@/context/store-provider.context";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

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
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AmplifyProvider>
          <StoreProvider authDetails={authDetails}>
            <AuthDetailsContextProvider authDetails={authDetails}>
              <Header />
              <main>{children}</main>
            </AuthDetailsContextProvider>
          </StoreProvider>
        </AmplifyProvider>
      </body>
    </html>
  );
}
