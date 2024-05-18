import "../app/globals.css"

import ResponsiveAppBar from "@/components/app-bar"
import AuthProvider from "@/services/auth/auth-provider"
import "@/services/i18n/config"
import type { Metadata } from "next"
import QueryClientProvider from "@/services/react-query/query-client-provider"
import queryClient from "@/services/react-query/query-client"
import ReactQueryDevtools from "@/services/react-query/react-query-devtools"
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import Footer from "@/components/footer"
import AffLinkProvider from "@/services/aff-link-provider"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Cos Sin | Trang chủ",
  }
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable
            )}
          >
            <TooltipProvider>
              <AuthProvider>
                <ResponsiveAppBar />
                <AffLinkProvider>
                  <div className="pt-14 pb-44">{children}</div>
                </AffLinkProvider>
                <Footer />
              </AuthProvider>
            </TooltipProvider>

            <Toaster richColors />
          </body>
        </QueryClientProvider>
      </body>
    </html>
  )
}
