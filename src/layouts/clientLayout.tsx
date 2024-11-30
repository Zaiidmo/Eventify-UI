import React from 'react'
import Navbar from '../components/layouts/Navbar'
import Footer from '@/components/layouts/Footer'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer/>
    </div>
  )
}