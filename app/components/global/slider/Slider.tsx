import React from 'react'

export default function Slider({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative">
            {children}
        </div>
    )
}
