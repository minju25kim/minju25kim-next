import { getAllPosts } from "@/lib/api";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terminology ",
  // description: 'The official minju25kim website.',
};

export default function Page() {
  const allPosts = getAllPosts("terminology");

  return (
    <main>
      Terminology
      {allPosts.map((post) => {
        return (
          <div key={post.slug}>
            <Link href={`/terminology/${post.slug}`} key={post.slug}>
              {post.title}
            </Link>
          </div>
        );
      })}
    </main>
  );
}