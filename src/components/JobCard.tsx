import React from 'react'
import Image from 'next/image'

export default function JobCard() {
    return (
        <div className='bg-white relative rounded-md'>
            <div className='bg-[#E99210] h-[50px] w-[50px] flex items-center justify-center absolute -top-[25px] left-8 rounded-[15px]'>
                <Image
                    src={'/logos/blogr.svg'}
                    alt='company logo'
                    width={21}
                    height={17}
                />
            </div>
            <div className='px-8 pt-[49px] pb-8 flex flex-col gap-[44px]'>
                <div className='flex flex-col gap-3'>
                    <div className='text-[#6E8098] flex items-center gap-3'>
                        <p> 5h ago</p>
                        <p>
                            <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="2" cy="2" r="2" fill="#6E8098" />
                            </svg>

                        </p>
                        <p>Full Time</p>
                    </div>
                    <h1 className='font-bold text-[#19202D] text-xl'>Senior Software Engineer</h1>
                    <p className='text-[#6E8098]'>Scoot</p>
                </div>
                <h3 className='text-[#5964E0] font-bold'>Cambodia</h3>
            </div>
        </div>
    )
}
