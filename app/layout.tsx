import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
// import { Toaster } from "sonner";
import "./globals.css";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";

const spaceGroteskHeading = Space_Grotesk({subsets:['latin'],variable:'--font-heading'});

const ibmPlexSans = IBM_Plex_Sans({subsets:['latin'],variable:'--font-sans'});


const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en"
      className={cn("h-full antialiased", inter.variable, "font-sans", ibmPlexSans.variable, spaceGroteskHeading.variable)}
    >
      <body className="min-h-full flex flex-col">

        {/* <Toaster position="top-right" richColors /> */}
        {/* Navbar */}
        {children}

        {/* Footer */}
      </body>
    </html>
  );
}