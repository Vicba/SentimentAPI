import React from 'react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
// import { useSession } from 'next-auth/client'


interface NavProps {
    openModal: () =>  void
}

export default function Nav({ openModal }: NavProps) {
    const session = false

  return (
    <div className='fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900/75 z-40 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between'>
        <div className='container w-full px-10 md:mx-auto flex justify-between items-center'>
            <Link href='/' className='font-bold text-2xl text-slate-900 dark:text-white'>
                SentimentAPI
            </Link>


            <div className='md:hidden'>
                <ThemeToggle/>
            </div>

            <div className='hidden md:flex gap-6 text-slate-900 dark:text-white justify-around items-center'>
                <ThemeToggle/>
                <Link href='/docs'>
                    Docs
                </Link>

                {session ? (
                    <>
                        <Link href='/dashboard'>
                            Dashboard
                        </Link>
                        <button className='bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg px-5 py-2'>
                            SignOut
                        </button>
                    </>
                ) : (
                    <button className='bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg px-5 py-2' onClick={openModal}>
                            SignIn
                    </button>
                )}
            </div>
        </div>
    </div>
  )
}
