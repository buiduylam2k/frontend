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
import { siteConfig } from "@/conf/site"
import Head from "next/head"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    metadataBase: new URL(siteConfig.url),
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    openGraph: {
      type: "website",
      locale: "vi_VN",
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
  }
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

type TProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: TProps) {
  return (
    <html>
      <Head>
        <meta
          name="google-site-verification"
          content="bT-5ebRKw5_x1W9sCZxA_VGc0Lb44yJFZBHtPrYcCZQ"
        />
      </Head>
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
                  <div className="pb-44">{children}</div>
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
