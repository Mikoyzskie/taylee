import React from 'react'
import Image from 'next/image'
import { Jobs as JobModel } from '@prisma/client'
import Link from 'next/link'

interface IJob {
    job: JobModel
}

interface TimePassed {
    days: number;
    hours: number;
    minutes: number;
    weeks: number;
    months: number;
}

export default function JobCard({ job }: IJob) {

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
    const stringedTime = job.createdAt
    const timePassed: TimePassed = getTimePassed(stringedTime.toString());

    return (
        <Link href={`/jobs/${job.id}`} className='bg-white relative rounded-md'>
            <div className='bg-[#E99210] h-[50px] w-[50px] flex items-center justify-center absolute -top-[25px] left-8 rounded-[15px] overflow-hidden'>
                <Image
                    src={'https://res.cloudinary.com/dipdd169x/image/upload/v1710006694/joblisting%20logos/Job_35_-_Time_Square_Apartments_ygjzzh.png'}
                    alt='company logo'
                    width={50}
                    height={50}
                    className='h-auto w-full object-contain'
                />
            </div>
            <div className='px-8 pt-[49px] pb-8 flex flex-col gap-[44px]'>
                <div className='flex flex-col gap-3'>
                    <div className='text-[#6E8098] flex items-center gap-3'>
                        <p>
                            {
                                timePassed.months > 0 ? `${timePassed.months} months` :
                                    timePassed.weeks > 0 ? `${timePassed.weeks} weeks` :
                                        timePassed.days > 0 ? `${timePassed.days} days` :
                                            timePassed.hours === 0 ? `${timePassed.minutes} mins` :
                                                `${timePassed.hours} hours`
                            } ago</p>
                        <p>
                            <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="2" cy="2" r="2" fill="#6E8098" />
                            </svg>

                        </p>
                        <p>Full Time</p>
                    </div>
                    <h1 className='font-bold text-[#19202D] text-xl'>{job.title}</h1>
                    <p className='text-[#6E8098]'>{job.companyname}</p>
                </div>
                <h3 className='text-[#5964E0] font-bold'>{job.country}</h3>
            </div>
        </Link>
    )
}
