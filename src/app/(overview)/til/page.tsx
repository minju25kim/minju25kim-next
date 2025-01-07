import { getAllPostsDirectory } from "@/lib/api";
import Title from "@/components/PrimaryTitle";
import AppBreadCrumb from '@/components/BreadCrumb';
import type { Metadata } from "next";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Table from '@/components/Table';
import CalendarDemo from "@/components/Calendar";
import { Post } from "@/interfaces/post";

export const metadata: Metadata = {
  title: "TIL",
};

export default function Page() {
  const allPosts = getAllPostsDirectory("til");

  return (
    <>
      <AppBreadCrumb directory="til" />
      <Title title="TIL" />
      <AppTabs allPosts={allPosts} />
    </>
  );
}

type AppTabsProps = {
  allPosts: Post[]
};

function AppTabs({ allPosts }: AppTabsProps) {
  return (
    <Tabs defaultValue="table" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="table">Table</TabsTrigger>
        <TabsTrigger value="calendar">Calendar</TabsTrigger>
      </TabsList>
      <TabsContent value="table">
        <Table directory="til" allPosts={allPosts} />
      </TabsContent>
      <TabsContent value="calendar">
        <CalendarDemo />
      </TabsContent>
    </Tabs>
  );
}
