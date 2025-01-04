import { getAllPosts } from "@/lib/api";
import Title from "@/components/Title";
import Table from '@/components/Table';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "TIL",
};

export default function Page() {
  const allPosts = getAllPosts("til");

  return (
    <>
      <Title title="TIL" />
      <Table directory="til" allPosts={allPosts} />
    </>
  );
}