"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Content } from "@/interfaces/Data"
import Card from "@/components/AppComponents/Cards"

interface CalendarProps {
  directory: string;
  allContent: Content[];
}

export default function AppCalendar({ directory, allContent }: CalendarProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  function filteredPost(date: Date) {
    const [...post] = allContent.filter((post) => new Date(post.date).toLocaleDateString() === date.toLocaleDateString())
    return post
  }
  const datesWithPosts = React.useMemo(() => {
    return allContent.map(post => new Date(post.date))
  }, [allContent])

  return (
    <div className="flex flex-col gap-2">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md smooth-corners-md border shadow"
        datesWithPosts={datesWithPosts}
      />
      <Card directory={directory} allContent={date ? filteredPost(date) : []} />
    </div>
  )
}

