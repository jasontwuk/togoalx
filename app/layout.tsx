import type { Metadata } from "next";
import { nunito } from "./utilities/fonts";
import "./utilities/globals.css";
import { Header } from "./components/Headerx";
import { Footer } from "./components/Footerx";
import { Head } from "./head";
import { AuthProvider } from "./utilities/authContext";

export const metadata: Metadata = {
  title: "ToGoalx",
  description: "Record the goals you achieve every day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head />

      <AuthProvider>
        <body className={`${nunito.className} w-full bg-yellow-100`}>
          <div className="mx-auto flex min-h-screen w-full max-w-screen-lg flex-col text-sm text-slate-800 sm:text-base">
            <Header />

            {children}

            <Footer />
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
