import { Inter } from 'next/font/google'
import './globals.css'
import PageLayout from '@/components/Layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '@my site',
  description: 'Test Demo Site',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PageLayout>
          {children}
        </PageLayout>
      </body>
    </html>
  )
}
