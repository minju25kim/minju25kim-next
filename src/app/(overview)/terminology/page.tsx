import { getAllPostsDirectory } from "@/lib/api";
import { Metadata } from "next";
import Title from "@/components/PrimaryTitle";
import Table from '@/components/Table';
import AppBreadCrumb from "@/components/BreadCrumb";
import { Post } from "@/interfaces/post";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
// import Table from '@/components/Table';
import AppCard from "@/components/Card";

export const metadata: Metadata = {
  title: "Terminology",
  // description: 'The official minju25kim website.',
};

export default function Page() {
  const allPosts = getAllPostsDirectory("terminology");

  return (
    <>
      <AppBreadCrumb directory="terminology" />
      <Title title="Terminology" />
      <AppTabs allPosts={allPosts} />
    </>
  );
}

type AppTabsProps = {
  allPosts: Post[]
};

export function AppTabs({ allPosts }: AppTabsProps) {
  return (
    <Tabs defaultValue="table" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="table">Table</TabsTrigger>
        <TabsTrigger value="card">Card</TabsTrigger>
      </TabsList>
      <TabsContent value="table">
        <Table directory="terminology" allPosts={allPosts} />
      </TabsContent>
      <TabsContent value="card">
        <AppCard directory="terminology" allPosts={allPosts}/>
      </TabsContent>
    </Tabs>
  );
}
