import { getAllPostsDirectory } from "@/lib/api";
import Title from "@/components/PrimaryTitle";
import Table from '@/components/Table';
import type { Metadata } from "next";
import AppBreadCrumb from '@/components/BreadCrumb';

export const metadata: Metadata = {
  title: "TIL",
};

export default function Page() {
  const allPosts = getAllPostsDirectory("til");

  return (
    <>
      <AppBreadCrumb directory="til"/>
      <Title title="TIL" />
      <Table directory="til" allPosts={allPosts} />
    </>
  );
}