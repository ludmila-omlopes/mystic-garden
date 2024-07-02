import './globals.css'
import { ThemeProvider } from "@/app/theme-provider"
import { LensProvider } from '@/app/lens-provider'
import { Web3ModalProvider } from '@/app/web3modal-provider'
import { Nav } from '@/components/nav'
import { raleway, lato } from './fonts'
import { PublicationsProvider } from './publications-provider'

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Web3ModalProvider>
              <LensProvider>
                <PublicationsProvider>
                 <Nav />
                  {children}
                </PublicationsProvider>
              </LensProvider>
          </Web3ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

