import { getAllPostsDirectory } from "@/lib/api";
import Title from "@/components/AppComponents/PrimaryTitle";
import AppTab from "@/components/AppComponents/Tab";

export default function Page() {
  const allPosts = getAllPostsDirectory("terminology");

  return (
    <>
      <Title title="Terminology" />
      <AppTab  views={["table","card"]} allPosts={allPosts} />
    </>
  );
}