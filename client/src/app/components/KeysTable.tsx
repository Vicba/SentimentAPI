import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { XMarkIcon, ClipboardDocumentIcon, CheckIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

interface KeyItem {
  id: string;
  key: string;
  enabled: boolean;
  userId: string;
}

interface KeysTableProps {
  keys: KeyItem[];
  handleDelete: (id: string) => void;
}

export default function KeysTable({ keys, handleDelete }: KeysTableProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showFullKey, setShowFullKey] = useState<string | null>(null); // Store the id of the key to show

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key).then(() => {
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey(null);
      }, 3000); // Clear the copiedKey after 3 seconds
    });
  };

  return (
    <div className='w-full lg:w-2/3'>
      <table className='w-full'>
        <thead className='text-left pb-10'>
          <tr>
            <th className=''>API Key</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((keyItem) => (
            <tr key={keyItem.id} className='border-b-slate-300 dark:border-b-gray-200 border-b-2 dark:border-opacity-60 border-opacity-60 flex justify-between'>
              <td className='py-3 flex items-center'>
                <div className='flex items-center'>
                  {showFullKey === keyItem.id ? keyItem.key : `${keyItem.key.substring(0, keyItem.key.length / 2)}...`}
                  {showFullKey === keyItem.id ? (
                    <EyeIcon
                      height={20}
                      width={20}
                      className='text-blue-600 dark:text-blue-400 ml-2 cursor-pointer'
                      onClick={() => setShowFullKey(null)}
                    />
                  ) : (
                    <EyeSlashIcon
                      width={20}
                      height={20}
                      className='text-blue-600 dark:text-blue-400 ml-2 cursor-pointer'
                      onClick={() => setShowFullKey(keyItem.id)}
                    />
                  )}
                </div>
              </td>
              <td className='cursor-pointer flex flex-row gap-3 py-3'>
                {copiedKey === keyItem.key ? 
                <CheckIcon 
                  color='green'
                  height={20} 
                  width={20} /> 
                : <ClipboardDocumentIcon
                  height={20}
                  width={20}
                  onClick={() => copyToClipboard(keyItem.key)}
                />}
                <XMarkIcon
                  height={20}
                  width={20}
                  className='ml-2 text-red-500'
                  strokeWidth={8}
                  onClick={() => handleDelete(keyItem.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
