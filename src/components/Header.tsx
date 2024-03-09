'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import AddJobDialog from './AddJobDialog';
import { Button } from './ui/button';

export default function Header() {

    const { isLoaded, userId, sessionId, getToken } = useAuth();

    const [create, setCreate] = useState(false)
    return (
        <>
            <header className='relative '>
                <Image
                    src={'/desktop/bg-pattern-header.svg'}
                    alt='header pattern'
                    height={160}
                    width={1440}
                    className='w-full max-h-[162px] z-10'
                />


                <div className='absolute maxWidth inset-0 mt-[45px] flex justify-between'>
                    <Link href={"/"} className='text-2xl text-white font-bold'>workbodia</Link>
                    {
                        !userId &&
                        <div className='flex gap-5 h-fit items-center'>
                            <Link href={"/jobs"} className='text-white'>Job List</Link>
                            <Link href={"/sign-in"} className='bg-[#19202D] text-white px-2 py-2 rounded-md'>Get Started</Link>
                            <Link href={"/sign-up"} className='text-white'>Sign Up</Link>
                        </div>
                    }
                    {
                        userId &&
                        <div className='flex justify-center items-center gap-5 mb-auto'>
                            <Link href={"/jobs"} className='text-white'>Job List</Link>
                            <UserButton />
                            <Button onClick={() => { setCreate(true) }}>Post Job</Button>
                        </div>
                    }
                </div>

            </header>

            {setCreate && <AddJobDialog open={create} setOpen={setCreate} />}
        </>

    )
}
