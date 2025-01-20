import { getAllPostsDirectory } from "@/lib/api";
import Title from "@/components/AppComponents/PrimaryTitle";
import AppTab from "@/components/AppComponents/Tab";
import { Post } from "@/interfaces/Data";

export default async function Page() {
  const allPosts = await getAllPostsDirectory("terminology");

  return (
    <>
      <Title title="Terminology" />
      <AppTab views={["table", "card"]} allPosts={allPosts} />
    </>
  );
}