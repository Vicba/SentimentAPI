import Image from 'next/image'
import Link from 'next/link'

import { BsArrowRight } from "react-icons/bs"

export default function Home() {
  //auth model onclick api key

  return (
    <main className="h-screen flex items-start md:items-center justify-center overflow-x-hidden">
      <div className="mt-32 md:mt-0 mx-8 container flex flex-col items-start md:items-center justify-center lg:flex-row gap-20">
        <div className='w-full h-full lg:w-1/2 flex flex-col text-black dark:text-white'> 
          <h1 className='text-5xl font-extrabold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-yellow-400'>SentimentAPI</h1>

          <p className='font-normal mb-10'>
            With the text Sentiment API, you can easily determine the
              sentiment of your text for free. Analyze text
            to determine positive, negative, or neutral sentiments, as well as
            extract emotions from text.
          </p>

          <div className="flex flex-row items-center justify-center md:justify-normal gap-5 mt-8">
            <Link href={'/docs'}>
              Documentation
            </Link>

            <Link
                  href='/login'
                  className='w-fit bg-slate-900 dark:bg-white text-white dark:text-black font-medium px-5 py-1 rounded-lg'>
                  Try with API key
                  <BsArrowRight className='inline ml-2' />
            </Link>
          </div>
          
        </div>
      
        <Image
          src='/next.svg'
          alt='Sentiment API'
          quality={100}
          height={500}
          width={500}
          />
      </div>
    </main>
  )
}
