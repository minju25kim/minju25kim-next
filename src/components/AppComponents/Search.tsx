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
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/") {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setResults([]);
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearch = async () => {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
      method: 'GET'
    });
    const data = await response.json();
    setResults(data);
  };

  const handleItemClick = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <div ref={searchContainerRef} className="relative w-full max-w-xs">
      <div className="flex max-w-xs items-center bg-gray-100 rounded-full">
        <SearchIcon className="ml-3 h-4 w-4 text-gray-500" />
        <Input
          ref={inputRef}
          placeholder="Press / to search"
          className="border-0 bg-transparent shadow-none focus-visible:ring-0 rounded-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />

        <Button onClick={handleSearch} variant="outline" className="rounded-full px-3 py-1">
          Search
        </Button>
      </div>

      {results.length > 0 && (
        <div className="absolute z-10 mt-2 w-full max-w-xs">
          <ul className="max-h-60 overflow-y-auto rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
            {results.map((item: Content) => (
              <Link key={item._id} href={`/${item.dir}/${item._id}`} onClick={() => handleItemClick()}>
                <li className="p-3 border-b last:border-b-0 border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.content.substring(0, 100)}...
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
