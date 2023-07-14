
import Link from 'next/link'

import { BsArrowLeft } from "react-icons/bs"


import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page not found',
}

const PageNotFound = () => {
  return (
    <section className='container pt-32 max-w-7xl mx-auto text-center flex flex-col gap-6 items-center dark:text-white'>
      <h1 className='text-4xl font-extrabold'>Site not found...</h1>
      <p>The site you&apos;re searching for does not exist.</p>
      <Link href='/' className='flex items-center justify-between'>
        <BsArrowLeft className='inline mr-2 underline' />
        Back to home
      </Link>
    </section>
  )
}

export default PageNotFound