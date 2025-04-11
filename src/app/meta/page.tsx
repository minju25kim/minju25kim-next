import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const techStack = [
  {
    category: 'Frontend',
    items: [
      'Next.js 15 (App Router)',
      'React 18',
      'TypeScript',
      'Tailwind CSS 4',
      'Shadcn UI Components',
      'Radix UI',
      'Lucide React Icons',
    ],
  },
  {
    category: 'Backend & Database',
    items: [
      'Supabase',
      'PostgreSQL',
      'Supabase SSR',
    ],
  },
  {
    category: 'Deployment & Infrastructure',
    items: [
      'Fly.io',
      'GitHub Actions',
      'Docker',
    ],
  },
  {
    category: 'Development Tools',
    items: [
      'ESLint',
      'Prettier',
      'Husky',
      'Commitlint',
      'Lint-staged',
      'Jest',
    ],
  },
];

export default async function MetaPage() {
  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-8 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          ← Back to home
        </Link>

        <Tabs defaultValue="metadata" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="metadata">Blog Metadata</TabsTrigger>
            <TabsTrigger value="techstack">Tech Stack</TabsTrigger>
          </TabsList>
          <TabsContent value="metadata" className="mt-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400">
                Blog metadata will be displayed here.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="techstack" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {techStack.map((section) => (
                <div key={section.category} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {section.category}
                  </h2>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="text-gray-600 dark:text-gray-400">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 