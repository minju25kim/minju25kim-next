'use client';

import { useEffect, useState } from 'react';
import { GlobeIcon } from 'lucide-react';

export default function RealTimeClock() {
    const [time, setTime] = useState('');
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Initialize time only on client side
        setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
        
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div
            className="align-baseline leading-none max-w-md items-center text-pretty text-xs text-muted-foreground
             min-w-30 transition-all duration-300 ease-in-out mb-2"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="relative w-full flex justify-center md:justify-start ">
                <span className={`flex flex-row gap-x-1.5 items-center absolute left-0 transition-opacity duration-300 ease-in-out ${isHovering ? 'opacity-0' : 'opacity-100'}`}>
                    <GlobeIcon className="size-3" />
                    Seoul, South Korea
                </span>
                {time && ( // Only render time when it's available
                    <span className={`absolute md:left-0 transition-opacity duration-300 ease-in-out ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                        {time}
                    </span>
                )}
            </div>
        </div>
    );
}