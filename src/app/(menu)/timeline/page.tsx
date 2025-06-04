import {
  Timeline,
  TimelineDescription,
  TimelineHeader,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/timeline";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

type Month =
  | "JANUARY"
  | "FEBRUARY"
  | "MARCH"
  | "APRIL"
  | "MAY"
  | "JUNE"
  | "JULY"
  | "AUGUST"
  | "SEPTEMBER"
  | "OCTOBER"
  | "NOVEMBER"
  | "DECEMBER";

const monthOrder: Record<Month, number> = {
  JANUARY: 0,
  FEBRUARY: 1,
  MARCH: 2,
  APRIL: 3,
  MAY: 4,
  JUNE: 5,
  JULY: 6,
  AUGUST: 7,
  SEPTEMBER: 8,
  OCTOBER: 9,
  NOVEMBER: 10,
  DECEMBER: 11,
};

export default async function TimelinePage() {
  const supabase = await createClient();

  // Fetch timeline data from Supabase
  const { data: timelineData } = await supabase.from("timeline").select("*");

  // Sort the data by parsing the time strings
  const sortedTimelineData = timelineData?.sort((a, b) => {
    const [monthA, yearA] = a.time.split(", ") as [Month, string];
    const [monthB, yearB] = b.time.split(", ") as [Month, string];

    // Compare years first
    if (yearA !== yearB) {
      return Number(yearB) - Number(yearA); // Descending order
    }

    // If years are same, compare months
    return monthOrder[monthB] - monthOrder[monthA];
  });

  return (
    <div className="  min-h-screen p-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8 inline-block"
        >
          ← Back to home
        </Link>

        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
            Timeline
          </h1>
        </div>

        <Timeline>
          {sortedTimelineData?.map((event) => (
            <TimelineItem key={event.id}>
              <TimelineHeader>
                <TimelineTime>{event.time}</TimelineTime>
                <TimelineTitle>{event.title}</TimelineTitle>
              </TimelineHeader>
              {event.description && (
                <TimelineDescription>{event.description}</TimelineDescription>
              )}
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </div>
  );
}
