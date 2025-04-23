import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "../redux/provider"


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "TeamSync - Project Collaboration Dashboard",
  description: "Collaborate with your team on projects, tasks, and files",
  generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
       
          <Providers>{children}</Providers>
       
      </body>
    </html>
  )
}
