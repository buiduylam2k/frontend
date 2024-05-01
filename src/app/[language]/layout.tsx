import "../../app/globals.css"

import ResponsiveAppBar from "@/components/app-bar"
import AuthProvider from "@/services/auth/auth-provider"
import { dir } from "i18next"
import "@/services/i18n/config"
import { languages } from "@/services/i18n/config"
import type { Metadata } from "next"
import StoreLanguageProvider from "@/services/i18n/store-language-provider"
import LeavePageProvider from "@/services/leave-page/leave-page-provider"
import QueryClientProvider from "@/services/react-query/query-client-provider"
import queryClient from "@/services/react-query/query-client"
import ReactQueryDevtools from "@/services/react-query/react-query-devtools"
import ConfirmDialogProvider from "@/components/confirm-dialog/confirm-dialog-provider"
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import Footer from "@/components/footer"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Trang chủ",
  }
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export function generateStaticParams() {
  return languages.map((language) => ({ language }))
}

export default function RootLayout({
  children,
  params: { language },
}: {
  children: React.ReactNode
  params: { language: string }
}) {
  return (
    <html lang={language} dir={dir(language)} suppressHydrationWarning>
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
              <StoreLanguageProvider>
                <ConfirmDialogProvider>
                  <AuthProvider>
                    <LeavePageProvider>
                      <ResponsiveAppBar />
                      <div className="pt-14 pb-44">{children}</div>
                      <Footer />
                    </LeavePageProvider>
                  </AuthProvider>
                </ConfirmDialogProvider>
              </StoreLanguageProvider>
            </TooltipProvider>
            <Toaster richColors />
          </body>
        </QueryClientProvider>
      </body>
    </html>
  )
}
