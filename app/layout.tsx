import "./global.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book Library",
  description: "Simple Book Library App",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
