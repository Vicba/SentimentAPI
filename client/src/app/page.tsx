"use client"
import Image from 'next/image'
import Link from 'next/link'
import { BsArrowRight } from "react-icons/bs"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useModal } from '@/context/ModalContext'


export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const {openModal} = useModal();



  return (
    <main className="h-screen flex items-start md:items-center justify-center overflow-x-hidden">
      <div className="mt-32 mb-32 sm:mb-0 md:mt-0 mx-8 container flex flex-col items-center xs:items-center justify-around lg:flex-row gap-20 md:gap-15">
        <div className='w-full h-full sm:w-4/5 lg:w-1/3 flex flex-col text-black dark:text-white'> 
          <h1 className='text-5xl font-extrabold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-yellow-400'>SentimentAPI</h1>

          <p className='font-normal mb-3'>
            Discover the sentiments behind text. 
            Our advanced analysis allows you to choose between binary, fine-grained sentimens or emotions! 
          </p>

          <p className='font-normal mb-10'>
            Dive deeper into the context of your words and extract emotions like never before. 
          </p>

          <div className="flex flex-row items-center justify-center md:justify-normal gap-5 mt-8">
            <Link href={'/docs'} className='hover:underline'>
              Documentation
            </Link>

             <button className='w-fit bg-slate-900 dark:bg-white text-white dark:text-black font-medium px-5 py-2 rounded-lg'
                onClick={() => { session?.user ? router.push('/dashboard') : openModal();
                  }}
                >
                See your API keys
                <BsArrowRight className='inline ml-2' />
              </button>
          </div>
          
        </div>
      
        <Image
          src='/images/hero2.png'
          alt='Sentiment API'
          quality={100}
          height={700}
          width={650}
          />
      </div>
    </main>
  )
}
