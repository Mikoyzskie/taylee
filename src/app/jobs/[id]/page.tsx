import React from 'react'
import Image from 'next/image'
import prisma from '@/lib/db/prisma'
import { CreateJobSchema } from '@/lib/validation/jobs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@clerk/nextjs';

interface TimePassed {
    days: number;
    hours: number;
    minutes: number;
    weeks: number;
    months: number;
}

function getTimePassed(timestamp: string): TimePassed {
    const currentTime: Date = new Date();
    const passedTime: Date = new Date(timestamp);

    const timeDifference: number = currentTime.getTime() - passedTime.getTime();

    const millisecondsInMinute: number = 1000 * 60;
    const millisecondsInHour: number = millisecondsInMinute * 60;
    const millisecondsInDay: number = millisecondsInHour * 24;
    const millisecondsInWeek: number = millisecondsInDay * 7;
    const millisecondsInMonth: number = millisecondsInDay * 30; // Approximation for a month

    const monthsPassed: number = Math.floor(timeDifference / millisecondsInMonth);
    const weeksPassed: number = Math.floor(timeDifference / millisecondsInWeek);
    const daysPassed: number = Math.floor(timeDifference / millisecondsInDay);
    const hoursPassed: number = Math.floor((timeDifference % millisecondsInDay) / millisecondsInHour);
    const minutesPassed: number = Math.floor((timeDifference % millisecondsInHour) / millisecondsInMinute);

    return {
        months: monthsPassed,
        weeks: weeksPassed,
        days: daysPassed,
        hours: hoursPassed,
        minutes: minutesPassed
    };
}

export default async function page({ params }: { params: { id: string } }) {
    const id = params.id
    const allJobs = await prisma.jobs.findUnique({ where: { id } })
    // const filteredData = allJobs.filter(item => item.id === params.id);

    //create a function that if all jobs are null return not-found

    const { userId } = auth()

    const stringedTime = allJobs!.createdAt
    const timePassed: TimePassed = getTimePassed(stringedTime.toString());

    return (
        <div className='max-w-[730px] w-full mx-auto -mt-[39px] relative z-10'>
            <div className='w-full'>

                <div className='flex bg-white w-full rounded-[6px] overflow-hidden shadow-md mb-8'>
                    <div>
                        <Image
                            src={allJobs!.companylogo}
                            alt='company logo'
                            width={200}
                            height={200}
                            className='h-full w-[140px] object-cover'
                        />
                    </div>
                    <div className='flex justify-between items-center w-full p-[42px]'>
                        <div className='flex flex-col justify-center  gap-[7px]'>
                            <h2 className='font-bold text-2xl'>{allJobs!.companyname}</h2>
                            <p className='text-[#6E8098]'>{timePassed.months > 0 ? `${timePassed.months} months` :
                                timePassed.weeks > 0 ? `${timePassed.weeks} weeks` :
                                    timePassed.days > 0 ? `${timePassed.days} days` :
                                        timePassed.hours === 0 ? `${timePassed.minutes} mins` :
                                            `${timePassed.hours} hours`} ago</p>
                        </div>
                    </div>
                </div>
                <div className='bg-white w-full h-fit shadow-md rounded-[6px] p-12 flex flex-col gap-10'>
                    <div className='flex items-center justify-between gap-5'>
                        <div>
                            <h1 className='text-[28px] font-bold'>{allJobs!.title}</h1>
                            <h3 className='text-[#5964E0] font-bold'>{allJobs!.country}</h3>
                        </div>
                        <Link href={allJobs!.site}>
                            <Button>Apply Now</Button>
                        </Link>
                    </div>
                    <div className='text-[#6E8098] whitespace-pre-line'>
                        {allJobs!.description}
                    </div>
                </div>


            </div>
        </div>
    )
}
