import Header from '@/components/Header'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}