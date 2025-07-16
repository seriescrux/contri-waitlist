import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
})

export const metadata: Metadata = {
    title: "Contri - Split Bills Instantly",
    description: "The future of group expenses. Split bills instantly, track seamlessly, pay with ease.",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={inter.variable}>
        <body className={`${inter.className} antialiased`}>
        <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
                style: {
                    background: "rgba(26, 25, 30, 0.8)",
                    color: "#cfff5e",
                    border: "1.5px solid #cfff5e",
                    boxShadow: "0 0 18px #8c7dff55",
                    backdropFilter: "blur(10px)",
                    borderRadius: "12px",
                    padding: "1rem 1.25rem",
                    fontWeight: 500,
                },
                duration: 4000,
            }}
        />

        {children}
        </body>
        </html>
    )
}
