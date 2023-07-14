import React from 'react'

export default function SigninButton({text}: {text: string}) {
    //authmodel

    return (
        <button className='bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg px-5 py-1'>
            {text}
        </button>
    )
}
