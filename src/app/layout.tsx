import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/navbar"

export const metadata: Metadata = {
  title: "StayScape",
  description:
    "Book a curated stay with a modern, smooth and professional experience"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col" cz-shortcut-listen="true">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
