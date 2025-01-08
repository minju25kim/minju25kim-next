import React from "react";
import { getAllPostsDirectory } from "@/lib/api";
import Title from "@/components/AppComponents/PrimaryTitle";
import AppBreadCrumb from '@/components/AppComponents/BreadCrumb';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Table from '@/components/AppComponents/Table';
import Calendar from "@/components/AppComponents/Calendar";
import { Post } from "@/interfaces/post";
// import Card from "@/components/AppComponents/Card";


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
        <Calendar directory="til" allPosts={allPosts} />
      </TabsContent>
    </Tabs>
  );
}
