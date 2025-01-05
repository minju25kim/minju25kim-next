import { getAllPostsDirectory } from "@/lib/api";
import { Metadata } from "next";
import Title from "@/components/PrimaryTitle";
import Table from '@/components/Table';
import AppBreadCrumb from "@/components/BreadCrumb";

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
      <Table directory="terminology" allPosts={allPosts} />
    </>
  );
}