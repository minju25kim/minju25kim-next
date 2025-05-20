import { signOut } from '@/app/(authenticated)/composer/actions';
import { createClient } from '@/utils/supabase/server';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import Link from 'next/link';

export default async function ComposerPage() {
  const supabase = await createClient();

  // Fetch dev and blog table data
  const { data: devDataRaw } = await supabase.from('dev').select('*');
  const { data: blogDataRaw } = await supabase.from('blog').select('*');
  const devData = devDataRaw ?? [];
  const blogData = blogDataRaw ?? [];

  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-8">
      <h1 className="text-4xl font-bold mt-8">
        contents editor
      </h1>
      <form className='flex flex-col items-center justify-center gap-4 absolute top-4 right-4'>
        <button className="bg-blue-500 text-white p-2 rounded-md" formAction={signOut}>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {devData.length > 0 ? devData.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.slug ? (
                        <Link href={`/composer/dev/${item.slug}`} className="text-blue-600 hover:underline">
                          {item.title || item.name || item.id}
                        </Link>
                      ) : (
                        item.title || item.name || item.id
                      )}
                    </TableCell>
                    <TableCell>{item.created_at ? new Date(item.created_at).toLocaleDateString() : '-'}</TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={2}>No data</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="blog">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogData.length > 0 ? blogData.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.slug ? (
                        <Link href={`/composer/blog/${item.slug}`} className="text-blue-600 hover:underline">
                          {item.title || item.name || item.id}
                        </Link>
                      ) : (
                        item.title || item.name || item.id
                      )}
                    </TableCell>
                    <TableCell>{item.created_at ? new Date(item.created_at).toLocaleDateString() : '-'}</TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={2}>No data</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
