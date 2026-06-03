import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Mr. Pickle's Sandwich Shop · San Francisco",
  description: "Fresh, handcrafted sandwiches in the Mission District. 32 specialty sandwiches, salads, and build-your-own options.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
