"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Post } from "@/interfaces/Data"
import Card from "@/components/AppComponents/Card"

interface CalendarProps {
  directory: string;
  allPosts: Post[];
}

export default function AppCalendar({ directory, allPosts }: CalendarProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  function filteredPost(date: Date) {
    const [...post] = allPosts.filter((post) => new Date(post.date).toLocaleDateString() === date.toLocaleDateString())
    return post
  }
  const datesWithPosts = React.useMemo(() => {
    return allPosts.map(post => new Date(post.date))
  }, [allPosts])

  return (
    <div className="flex flex-col gap-2">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow"
        datesWithPosts={datesWithPosts}
      />
      <Card directory={directory} allPosts={date ? filteredPost(date) : []} />
    </div>
  )
}

