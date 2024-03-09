import React from 'react'
import Image from 'next/image'
import prisma from '@/lib/db/prisma'
import { CreateJobSchema } from '@/lib/validation/jobs';
import { Button } from '@/components/ui/button';

interface TimePassed {
    days: number;
    hours: number;
    minutes: number;
    weeks: number;
    months: number;
}


export default async function page({ params }: { params: { id: string } }) {
    const allJobs = await prisma.jobs.findMany()
    const filteredData = allJobs.filter(item => item.id === params.id);
    return (
        <div className='max-w-[730px] w-full mx-auto -mt-[39px] relative z-10'>
            <div className='flex'>

                {
                    filteredData.map((item, index: number) => {

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
                        const stringedTime = item.createdAt
                        const timePassed: TimePassed = getTimePassed(stringedTime.toString());

                        return (
                            <div key={index} className='w-full'>
                                <div className='flex bg-white w-full rounded-[6px] overflow-hidden shadow-md mb-8'>
                                    <div>
                                        <Image
                                            src={'https://res.cloudinary.com/dipdd169x/image/upload/v1710006694/joblisting%20logos/Job_35_-_Time_Square_Apartments_ygjzzh.png'}
                                            alt='company logo'
                                            width={200}
                                            height={200}
                                            className='h-full w-[140px] object-cover'
                                        />
                                    </div>
                                    <div className='flex flex-col justify-center p-[42px] gap-[7px]'>
                                        <h2 className='font-bold text-2xl'>{item.companyname}</h2>
                                        <p className='text-[#6E8098]'>{timePassed.months > 0 ? `${timePassed.months} months` :
                                            timePassed.weeks > 0 ? `${timePassed.weeks} weeks` :
                                                timePassed.days > 0 ? `${timePassed.days} days` :
                                                    timePassed.hours === 0 ? `${timePassed.minutes} mins` :
                                                        `${timePassed.hours} hours`} ago</p>
                                    </div>
                                </div>
                                <div className='bg-white w-full h-fit shadow-md rounded-[6px] p-12 flex flex-col gap-10'>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <h1 className='text-[28px] font-bold'>{item.title}</h1>
                                            <h3 className='text-[#5964E0] font-bold'>{item.country}</h3>
                                        </div>
                                        <Button>Apply Now</Button>
                                    </div>
                                    <div className='text-[#6E8098]'>
                                        {item.description}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }


            </div>
        </div>
    )
}
