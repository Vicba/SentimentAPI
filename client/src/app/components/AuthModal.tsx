import React, { ReactNode, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import {signIn} from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

import { XMarkIcon } from '@heroicons/react/24/solid';


interface AuthModalProps {
  show: boolean;
  onClose: () => void;
}

export function AuthModal({ show = false, onClose }: AuthModalProps): React.ReactNode {
    const [disabled, setDisabled] = useState(false);
    const [showConfirm, setConfirm] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);

    useEffect(() => {
        toast.dismiss();
    }, []);


    const signInWithGoogle = () => {
        toast.loading('Redirecting...');
        setDisabled(true);
        // Perform sign in
        signIn('google', {
            callbackUrl: window.location.href,
        });
    };


    const closeModal = () => {
        if (typeof onClose === 'function') {
        onClose();
        }
    };


    return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${show ? 'visible' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black opacity-75" />

      <div className="min-h-screen text-center">
        <div className="fixed inset-0">
          <div className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </div>
          <div className="inline-block w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:rounded-md max-w-md relative">
            {/* Close icon */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 shrink-0 p-1 rounded-md hover:bg-gray-100 transition focus:outline-none"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <div className="py-12">
              <div className="px-4 sm:px-12">
                <div className="flex justify-center">
                  <Link href="/" className="flex items-center space-x-1">
                      <span className="text-xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-yellow-400">
                        SentimentAPI
                      </span>
                  </Link>
                </div>

                <h3 className="mt-6 font-bold text-lg sm:text-2xl text-center">
                  {showSignIn ? 'Welcome back!' : 'Create your account'}
                </h3>

                {!showSignIn ? (
                  <p className="mt-2 text-gray-500 text-base text-center">
                    Please create an account to list create and manage your API keys.
                  </p>
                ) : null}

                <div className="mt-10">
                  {/* Sign with Google */}
                  <button
                    disabled={disabled}
                    onClick={signInWithGoogle}
                    className="h-[46px] w-full mx-auto mb-5 border rounded-md p-2 flex justify-center items-center space-x-2 text-gray-500 hover:text-gray-600 hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-500 disabled:hover:bg-transparent disabled:hover:border-gray-200 transition-colors"
                  >
                    <Image
                      src="/google.svg"
                      alt="Google"
                      width={32}
                      height={32}
                    />
                    <span>Sign {showSignIn ? 'in' : 'up'} with Google</span>
                  </button>

                  {/* Sign with Github */}
                  <button
                    disabled={disabled}
                    onClick={signInWithGoogle}
                    className="h-[46px] w-full mx-auto mb-5 border rounded-md p-2 flex justify-center items-center space-x-2 text-gray-500 hover:text-gray-600 hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-500 disabled:hover:bg-transparent disabled:hover:border-gray-200 transition-colors"
                  >
                    <Image
                      src="/github.svg"
                      alt="Github"
                      width={32}
                      height={32}
                    />
                    <span>Sign {showSignIn ? 'in' : 'up'} with GitHub</span>
                  </button>


                  <p className="mt-2 text-center text-sm text-gray-500">
                    {showSignIn ? (
                      <>
                        Don&apos;t have an account yet?{' '}
                        <button
                          type="button"
                          disabled={disabled}
                          onClick={() => setShowSignIn(false)}
                          className="underline underline-offset-1 font-semibold text-slate-900 hover:text-slate-600 disabled:hover:text-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Sign up
                        </button>
                        .
                      </>
                    ) : (
                      <>
                        Already have an account?{' '}
                        <button
                          type="button"
                          disabled={disabled}
                          onClick={() => setShowSignIn(true)}
                          className="underline underline-offset-1 font-semibold text-slate-900 hover:text-slate-600 disabled:hover:text-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Log in
                        </button>
                        .
                      </>
                    )}
                  </p>

                  {/* Confirm component */}
                  {showConfirm && (
                    <div>
                      {/* Add your Confirm component code here */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}