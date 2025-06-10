"use client";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

// Fetcher utility for API
async function fetchContent(category: "dev" | "blog") {
  const res = await fetch(`/api/get-editor-contents?category=${category}`);
  if (!res.ok) throw new Error("Failed to fetch " + category);
  return res.json();
}

type ContentRow = {
  id: string | number;
  slug?: string;
  title?: string;
  name?: string;
  created_at: string;
  tableType: "dev" | "blog";
};

function ContentTable({ data }: { data: ContentRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {item.slug ? (
                  <Link
                    href={
                      item.tableType === "dev"
                        ? `/composer/dev/${item.slug}`
                        : `/composer/blog/${item.slug}`
                    }
                    className="text-blue-600 hover:underline"
                  >
                    {item.title || item.name || item.id}
                  </Link>
                ) : (
                  item.title || item.name || item.id
                )}
              </TableCell>
              <TableCell>
                {item.created_at
                  ? new Date(item.created_at).toLocaleDateString()
                  : "-"}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={2}>No data</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default function ComposerTableClient() {

  const {
    data: devDataRaw,
    isLoading: devLoading,
    error: devError,
  } = useQuery({
    queryKey: ["editor-contents", "dev"],
    queryFn: () => fetchContent("dev"),
  });

  const {
    data: blogDataRaw,
    isLoading: blogLoading,
    error: blogError,
  } = useQuery({
    queryKey: ["editor-contents", "blog"],
    queryFn: () => fetchContent("blog"),
  });

  // Add tableType for link routing
  const devData: ContentRow[] = (devDataRaw ?? []).map((item: any) => ({ ...item, tableType: "dev" }));
  const blogData: ContentRow[] = (blogDataRaw ?? []).map((item: any) => ({ ...item, tableType: "blog" }));

  // Helper sorters
  const sortByLatest = (a: ContentRow, b: ContentRow) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  const sortByOldest = (a: ContentRow, b: ContentRow) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime();

  // Loading/Error UI
  if (devLoading || blogLoading) {
    return <div className="flex min-h-32 items-center justify-center">Loading...</div>;
  }
  if (devError || blogError) {
    return <div className="flex min-h-32 items-center justify-center text-red-500">Error loading content.</div>;
  }

  return (
    <Tabs defaultValue="dev">
      <TabsList>
        <TabsTrigger value="dev">Dev</TabsTrigger>
        <TabsTrigger value="blog">Blog</TabsTrigger>
      </TabsList>
      <TabsContent value="dev">
        <Tabs defaultValue="latest" className="mt-4">
          <TabsList>
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="oldest">Oldest</TabsTrigger>
          </TabsList>
          <TabsContent value="latest">
            <ContentTable data={devData.slice().sort(sortByLatest)} />
          </TabsContent>
          <TabsContent value="oldest">
            <ContentTable data={devData.slice().sort(sortByOldest)} />
          </TabsContent>
        </Tabs>
      </TabsContent>
      <TabsContent value="blog">
        <Tabs defaultValue="latest" className="mt-4">
          <TabsList>
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="oldest">Oldest</TabsTrigger>
          </TabsList>
          <TabsContent value="latest">
            <ContentTable data={blogData.slice().sort(sortByLatest)} />
          </TabsContent>
          <TabsContent value="oldest">
            <ContentTable data={blogData.slice().sort(sortByOldest)} />
          </TabsContent>
        </Tabs>
      </TabsContent>
    </Tabs>
  );
} 