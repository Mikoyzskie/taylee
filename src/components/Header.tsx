import React from 'react'
import Image from 'next/image'

export default function Header() {
    return (
        <header className='relative -z-10'>
            <Image
                src={'/desktop/bg-pattern-header.svg'}
                alt='header pattern'
                height={160}
                width={1440}
                className='w-full max-h-[162px]'
            />
            <div className='absolute maxWidth inset-0 mt-[45px]'>
                <h2 className='text-2xl text-white font-bold'>workbodia</h2>
            </div>
        </header>
    )
}
