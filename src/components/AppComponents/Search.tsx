'use client'

import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState } from "react"
import { SearchIcon } from '@/components/icons/index'

export default function Search() {
    const inputRef = useRef<HTMLInputElement>(null)
    const [searchTerm, setSearchTerm] = useState<string>("")

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            performSearch(searchTerm)
        }
    }

    const performSearch = (term: string) => {
        console.log("Searching for:", term)
    }

    return (
        <div className="flex items-center w-full gap-2 max-w-60 rounded-md border border-gray-300 bg-gray-50 dark:bg-gray-900 p-2 h-8">
            <SearchIcon className="h-4 w-4" />
            <Input
                ref={inputRef}
                type="search"
                placeholder="Search"
                className="w-full border-0 h-full font-light"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
            />
        </div>
    )
}
