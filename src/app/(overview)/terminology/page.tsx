import { getAllPosts } from "@/lib/api";
import { Metadata } from "next";
import Title from "@/components/Title";
import Table from '@/components/Table';

export const metadata: Metadata = {
  title: "Terminology",
  // description: 'The official minju25kim website.',
};

export default function Page() {
  const allPosts = getAllPosts("terminology");

  return (
    <>
      <Title title="Terminology" />
      <Table directory="terminology" allPosts={allPosts} />
    </>
  );
}