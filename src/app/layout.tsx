import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Central de Captações Alpha",
  description: "Plataforma para gestão de captações de fotos e vídeos da Assessoria Alpha.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
