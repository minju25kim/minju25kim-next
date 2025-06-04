import Link from "next/link";

const techStack = [
  {
    category: "Frontend",
    items: [
      { name: "Next.js 15 (App Router)", url: "https://nextjs.org/" },
      { name: "React 18", url: "https://react.dev/" },
      { name: "TypeScript", url: "https://www.typescriptlang.org/" },
      { name: "Tailwind CSS 4", url: "https://tailwindcss.com/" },
      { name: "shadcn/ui Components", url: "https://ui.shadcn.com/" },
      { name: "Radix UI", url: "https://www.radix-ui.com/" },
      { name: "Lucide React Icons", url: "https://lucide.dev/" },
      { name: "Plate (Rich Text Editor)", url: "https://plate.udecode.io/" },
      { name: "React Markdown", url: "https://github.com/remarkjs/react-markdown" },
    ],
  },
  {
    category: "Backend & Database",
    items: [
      { name: "Supabase", url: "https://supabase.com/" },
      { name: "PostgreSQL", url: "https://www.postgresql.org/" },
      { name: "Supabase SSR", url: "https://supabase.com/docs/guides/with-nextjs" },
    ],
  },
  {
    category: "Deployment & Infrastructure",
    items: [
      { name: "Fly.io", url: "https://fly.io/" },
      { name: "GitHub Actions", url: "https://github.com/features/actions" },
      { name: "Docker", url: "https://www.docker.com/" },
    ],
  },
  {
    category: "Development Tools",
    items: [
      { name: "ESLint", url: "https://eslint.org/" },
      { name: "Prettier", url: "https://prettier.io/" },
      { name: "Husky", url: "https://typicode.github.io/husky/" },
      { name: "Commitlint", url: "https://commitlint.js.org/" },
      { name: "Lint-staged", url: "https://github.com/okonet/lint-staged" },
      { name: "Jest", url: "https://jestjs.io/" },
      { name: "Zustand (State)", url: "https://zustand-demo.pmnd.rs/" },
      { name: "Zod (Validation)", url: "https://zod.dev/" },
    ],
  },
];

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MetaPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const tab = (params.tab as string) || "metadata";

  return (
    <div className="  min-h-screen p-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-8 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          ← Back to home
        </Link>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
            Meta
          </h1>

          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <Link
              href="/meta?tab=metadata"
              className={`px-3 py-1.5 rounded-md transition-colors ${
                tab === "metadata"
                  ? "bg-white dark:bg-gray-700 shadow-sm"
                  : "hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Blog Metadata
            </Link>
            <Link
              href="/meta?tab=techstack"
              className={`px-3 py-1.5 rounded-md transition-colors ${
                tab === "techstack"
                  ? "bg-white dark:bg-gray-700 shadow-sm"
                  : "hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Tech Stack
            </Link>
          </div>
        </div>

        {tab === "metadata" && (
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">
              Blog metadata will be displayed here.
            </p>
          </div>
        )}

        {tab === "techstack" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techStack.map((section) => (
              <div
                key={section.category}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg"
              >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  {section.category}
                </h2>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.name} className="text-gray-600 dark:text-gray-400">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 dark:hover:text-blue-400 underline transition-colors"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
