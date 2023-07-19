"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import KeysTable from '../components/KeysTable';
import { ExclamationTriangleIcon, PlusIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Dashboard() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  })


  const generateKey = async () => {
    try{
      await axios.post('/api/apikey/create')
      toast.success('API key generated successfully')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await axios.post('/api/apikey/delete', { id })
      toast.success('API key deleted successfully')
    } catch (error: any) {
      toast.error(error.message)
    }
  };


  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const response = await axios.get('/api/apikey/getkeys');
        const keys = response.data;
        setKeys(keys);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchKeys();
  }, [keys]);

  

  return (
    <main className="h-screen flex items-start md:items-center justify-center overflow-x-hidden">
      <div className="w-[80%] h-[70%] my-auto mx-auto flex flex-col items-start justify-start text-black dark:text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-15">Dashboard</h1>
        <form>

        </form>
        <button className='my-10 font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-5 py-1 rounded-md flex flex-row gap-3 items-center justify-center' onClick={generateKey}>
          <PlusIcon height={21} width={21}/>
          Generate new API key
        </button>

        <h3 className='font-bold text-2xl'>API keys:</h3>
        <p className='text-slate-900 dark:text-white mb-10 font-light'>Only a maximum of 3 API keys are allowed !</p>
        {keys.length > 0 ? (
          <KeysTable keys={keys} handleDelete={handleDelete}/>
        ): (
          <>
            <p className='bg-yellow-200 text-yellow-600 px-5 py-1 rounded-md font-semibold flex flex-row items-center justify-center gap-3'>
              <ExclamationTriangleIcon height={21} width={21}/> No current API Keys</p>
          </>
        )}
      </div>
    </main>
  );
}
