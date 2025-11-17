import type { Metadata } from "next";
import "./globals.css";
import { VideoProvider } from "./context/VideoContext";

export const metadata: Metadata = {
  title: {
    default: "Pittachara",
    template: "%s | Pittachara"
  },
  description: "Preserving Nature's Legacy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <VideoProvider>
          {children}
        </VideoProvider>
      </body>
    </html>
  );
}
