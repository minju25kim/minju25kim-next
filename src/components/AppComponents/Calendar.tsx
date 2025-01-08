"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
// import AppToolTip from "./ToolTip"
import { Post } from "@/interfaces/post"
import Card from "@/components/AppComponents/Card"

interface CalendarProps {
  directory: string;
  allPosts: Post[];
}

export default function CalendarDemo({ directory, allPosts }: CalendarProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  function filteredPost(date: Date) {
    const [...post] = allPosts.filter((post) => new Date(post.date).toLocaleDateString() === date.toLocaleDateString())

    return post
  }
  return (
    <div>
      <Calendar
        // showWeekNumber
        fixedWeeks
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow"
      />
      <Card directory={directory} allPosts={date ? filteredPost(date) : []} />
    </div>
  )
}

