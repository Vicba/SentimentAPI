"use client"
import { useState } from 'react'
import Nav from './components/Nav'
import './globals.css'
import type { Metadata } from 'next'
import { AuthModal } from './components/AuthModal'
import { SessionProvider } from 'next-auth/react'
import { ModalProvider } from '@/context/ModalContext'
import { Toaster } from 'react-hot-toast'


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({children}: {children: React.ReactNode}) {

  return (
    <html lang="en">
      <body className='h-screen bg-gray-50 dark:bg-slate-900'>
        <SessionProvider>
          <ModalProvider>
            <Nav/>
            {children}
            <AuthModal/>
            <Toaster/>
          </ModalProvider>
        </SessionProvider>
        </body>
    </html>
  )
}
