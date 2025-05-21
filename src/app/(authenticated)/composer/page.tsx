import { signOut } from "@/app/(authenticated)/composer/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

// ContentTable: renders a table for given data
function ContentTable({ data }: { data: [] }) {
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

export default async function ComposerPage() {
  const supabase = await createClient();

  // Fetch dev and blog table data (no order, will sort in-memory)
  const { data: devDataRaw } = await supabase.from("dev").select("*");
  const { data: blogDataRaw } = await supabase.from("blog").select("*");
  // Add tableType for link routing
  const devData = (devDataRaw ?? []).map((item) => ({ ...item, tableType: "dev" }));
  const blogData = (blogDataRaw ?? []).map((item) => ({ ...item, tableType: "blog" }));

  // Helper sorters
  const sortByLatest = (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  const sortByOldest = (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime();

  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-8">
      <h1 className="text-4xl font-bold mt-8">contents editor</h1>
      <form className="flex flex-col items-center justify-center gap-4 absolute top-4 right-4">
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          formAction={signOut}
        >
          Log Out
        </button>
      </form>
      <div className="w-full max-w-3xl mt-8">
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
      </div>
    </div>
  );
}
