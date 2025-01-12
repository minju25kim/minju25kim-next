'use client'

import { Input } from "@/components/ui/input"
import { useEffect, useRef } from "react"
import { SearchIcon } from '@/components/icons/index'

export default function Search() {
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "/") {
                event.preventDefault()
                inputRef.current?.focus()
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    return (
        <div className="flex items-center w-full sm:max-w-sm rounded-md border border-gray-300 bg-gray-50 dark:bg-gray-900 px-1 py-1 h-6">
            <SearchIcon className="h-4 w-4" />
            <Input ref={inputRef} type="search" placeholder="Search" className="w-full border-0 h-4 font-light" />
        </div>
    )
}

