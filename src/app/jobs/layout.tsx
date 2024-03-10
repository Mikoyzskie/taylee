import Header from '@/components/Header'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='bg-[#f2f2f2] min-h-screen'>
            <Header />
            {children}
        </div>
    )
}
