import type { Metadata } from "next";
import "./globals.css";
import { VideoProvider } from "./context/VideoContext";

export const metadata: Metadata = {
  title: {
    default: "Pittachhara",
    template: "%s | Pittachhara"
  },
  description: "The forest spans approximately 50 acres (≈20 hectares) of privately owned land in Khagrachari Hill District. It is embedded within the globally recognised Indo-Burma Biodiversity Hotspot and remains one of the few well-vegetated, semi-evergreen hill forests in the region. Surveys have documented around 150 species of resident and migratory birds, including threatened taxa such as the Red-breasted Parakeet (Psittacula alexandri) and Cachar Bulbul (Hemixos flavala flavala). Key mammals include the Bengal Slow Loris (Nycticebus bengalensis), Northern Pig-tailed Macaque (Macaca leonina), and Leopard Cat (Prionailurus bengalensis), all listed as Vulnerable or Endangered on the IUCN Red List. The forest also hosts at least 26 species of snakes and other 20 reptiles and amphibians.",
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
