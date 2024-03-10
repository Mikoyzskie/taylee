import React from 'react'
import JobCard from '@/components/JobCard'
import Image from 'next/image'
import prisma from '@/lib/db/prisma'
import { CreateJobSchema } from '@/lib/validation/jobs'
import { auth } from '@clerk/nextjs'


export default async function page({ searchParams }: any) {

    // console.log(searchParams);
    const location = searchParams.location
    const job = searchParams.job

    function isEmpty() {
        return Object.keys(searchParams).length === 0;
    }

    const status = isEmpty()

    const { userId } = auth()

    let allJobs
    if (userId && status) {
        allJobs = await prisma.jobs.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
    } else {
        if (!userId && status) {
            allJobs = await prisma.jobs.findMany({ orderBy: { createdAt: 'desc' } })
        }
        else if (!userId && !status) {
            allJobs = await prisma.jobs.findMany({
                where: {
                    OR: [
                        {
                            country: {
                                contains: location,
                                mode: 'insensitive'
                            },
                            title: {
                                contains: job,
                                mode: 'insensitive'
                            }
                        }
                    ]
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
        }
        else {
            allJobs = await prisma.jobs.findMany({ orderBy: { createdAt: 'desc' } })
        }
    }





    return (
        <div className='maxWidth -mt-[39px] relative z-10'>
            {/* filters */}

            <form className='bg-white rounded-md shadow-md grid grid-cols-3 mb-[105px]'>
                <div className=' flex gap-4 py-7 px-8 '>
                    <Image
                        src={'/desktop/icon-search.svg'}
                        alt='seach icon'
                        width={24}
                        height={24}
                    />

                    <input name='job' type="text" placeholder='Filter by title, companies, expertise' className='outline-none w-full' />

                </div>
                <div className=' flex gap-4 py-7 px-8 '>
                    <Image
                        src={'/desktop/icon-location.svg'}
                        alt='seach icon'
                        width={17}
                        height={24}
                    />

                    <input name='location' type="text" placeholder='Filter by location…' className='outline-none w-full' />
                </div>
                <div className='flex items-center justify-center'>
                    <button type='submit' className='font-bold px-[35.5px] py-3 text-white bgblue rounded-[5px]'>Search</button>
                </div>
            </form>

            {/* job listing */}

            <div className='grid grid-cols-3 gap-[30px] joblist'>
                {
                    allJobs.map((job, index: number) => {
                        return (
                            <JobCard key={index} job={job} />
                        )
                    })
                }
                {
                    allJobs?.length === 0 &&
                    <p>No job entries</p>
                }

            </div>
        </div>
    )
}
