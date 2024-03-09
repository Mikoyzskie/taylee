import React from 'react'
import JobCard from '@/components/JobCard'
import Image from 'next/image'
import prisma from '@/lib/db/prisma'
import { CreateJobSchema } from '@/lib/validation/jobs'


export default async function page() {

    // const {userId} = auth()

    const allJobs = await prisma.jobs.findMany()

    return (
        <div className='maxWidth -mt-[39px] relative z-10'>
            {/* filters */}

            <div className='bg-white rounded-md shadow-md grid grid-cols-3 mb-[105px]'>
                <div className=' flex gap-4 py-7 px-8 '>
                    <Image
                        src={'/desktop/icon-search.svg'}
                        alt='seach icon'
                        width={24}
                        height={24}
                    />

                    <input type="text" placeholder='Filter by title, companies, expertise' className='outline-none w-full' />

                </div>
                <div className=' flex gap-4 py-7 px-8 '>
                    <Image
                        src={'/desktop/icon-location.svg'}
                        alt='seach icon'
                        width={17}
                        height={24}
                    />

                    <input type="text" placeholder='Filter by location…' className='outline-none w-full' />
                </div>
                <div className='flex items-center justify-center'>
                    <button className='font-bold px-[35.5px] py-3 text-white bgblue rounded-[5px]'>Search</button>
                </div>
            </div>

            {/* job listing */}

            <div className='grid grid-cols-3 gap-[30px] joblist'>
                {
                    allJobs.map((job, index: number) => {
                        return (
                            <JobCard key={index} job={job} />
                        )
                    })
                }
                {/* <JobCard />
                <JobCard />
                <JobCard />
                <JobCard /> */}

            </div>
        </div>
    )
}
