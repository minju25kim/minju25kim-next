'use client'

import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState } from "react"
import { SearchIcon } from '@/components/icons/index'
import { Content } from "@/interfaces/Data"
import { Button } from "../ui/button"
import Link from "next/link"

export default function Search() {
  const inputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Content[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Handle keyboard shortcuts and click outside
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/") {
        event.preventDefault()
        setIsSearchOpen(true)
        inputRef.current?.focus()
      }

      if (results.length > 0) {
        if (event.key === 'ArrowDown') {
          event.preventDefault()
          setSelectedIndex(prev => {
            if (prev === results.length - 1) return 0
            return prev + 1
          })
        } else if (event.key === 'ArrowUp') {
          event.preventDefault()
          setSelectedIndex(prev => {
            if (prev <= 0) return results.length - 1
            return prev - 1
          })
        }
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setResults([])
        setIsSearchOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [results, selectedIndex])

  // Debounced search
  useEffect(() => {
    if (query.length === 0) {
      setResults([])
      return
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout
    timeoutRef.current = setTimeout(async () => {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await response.json()
      setResults(data)
      setSelectedIndex(-1)
    }, 300) // 300ms debounce delay

    // Cleanup timeout
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [query])

  const handleItemClick = () => {
    setQuery('')
    setResults([])
    setIsSearchOpen(false)
  }

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen)
    if (!isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }

  return (
    <div ref={searchContainerRef} className="relative">
      {/* Search Icon and Bar */}
      <div className="flex items-center">
        {/* Show only icon on small screens */}
        {!isSearchOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSearchToggle}
            className="rounded-full md:hidden"
          >
            <SearchIcon className="h-4 w-4" />
          </Button>
        )}

        {/* Show search bar on medium screens and above */}
        <div className={`${isSearchOpen ? 'flex' : 'hidden'} md:flex items-center bg-gray-100 rounded-full`}>
          <SearchIcon className="ml-3 h-4 w-4 text-gray-500" />
          <Input
            ref={inputRef}
            placeholder="Search..."
            className="border-0 bg-transparent shadow-none focus-visible:ring-0 rounded-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && query.length > 0 && setSelectedIndex(0)}
          />
        </div>
      </div>

      {/* Search Results */}
      {(isSearchOpen || query.length > 0) && (
        <div className="absolute z-10 mt-2 w-full">
          {results.length > 0 ? (
            <ul className="max-h-[60vh] overflow-y-auto rounded-md smooth-corners-md bg-white dark:bg-gray-800 shadow-lg">
              {results.map((item: Content, index) => (
                <Link key={item._id} href={`/${item.dir}/${item._id}`} onClick={handleItemClick}>
                  <li className={`p-3 border-b last:border-b-0 border-gray-100 dark:border-gray-700 transition-all duration-200 ${index === selectedIndex ? 'shadow-md scale-[1.02] bg-primary-50 dark:bg-primary-900' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.content.substring(0, 100)}...
                    </p>
                  </li>
                </Link>
              ))}
            </ul>
          ) : query.length > 0 ? (
            <div className="p-4 rounded-md smooth-corners-md bg-white dark:bg-gray-800 shadow-lg">
              <p className="text-gray-600 dark:text-gray-400">No results found for "{query}"</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}