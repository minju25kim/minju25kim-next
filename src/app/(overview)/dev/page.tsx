import Title from "@/components/AppComponents/PrimaryTitle";
import AppTab from "@/components/AppComponents/Tab";
import { getAllPostsDirectory } from "@/lib/api";


export default async function Page() {
  const allPosts = await getAllPostsDirectory("dev");

  return (
    <>
      <Title title="Dev" />
      <AppTab views={["table", "card"]} allPosts={allPosts} />
    </>

  );
}
