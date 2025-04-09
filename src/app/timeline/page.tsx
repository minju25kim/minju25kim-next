import Link from "next/link";
import {
  Timeline,
  TimelineItem,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
  TimelineHeader,
} from '@/components/timeline';

const timelineData = [
  {
    id: 1,
    title: 'Vercel was founded in SF, USA',
    description:
      'Vercel Inc., formerly ZEIT, is an American cloud platform as a service company. The company maintains the Next.js web development framework.',
    time: 'May, 2020',
  },
  {
    id: 2,
    title: 'Shadcn First Commit',
    description:
      'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.',
    time: 'January, 2023',
  },
  {
    id: 3,
    title: 'Shadcn Timeline',
    description: 'Shadcn timeline component. Open Source.',
    time: 'November, 2024',
  },
];

export default async function TimelinePage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-gray-600 hover:text-blue-600 transition-colors mb-8 inline-block"
        >
          ← Back to home
        </Link>

        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold">Timeline</h1>
        </div>
        <p>this will be updated soon</p>

        <Timeline>
          {timelineData.map((event) => (
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