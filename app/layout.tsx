import type { Metadata } from "next";
import { nunito } from "./utilities/fonts";
import "./utilities/globals.css";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
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
        <body
          className={`${nunito.className} w-full max-w-screen-lg mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 bg-yellow-100`}
        >
          <Header />

          {children}

          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
