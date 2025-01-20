import Title from "@/components/AppComponents/PrimaryTitle";
import AppTab from "@/components/AppComponents/Tab";
import { getAllPostsDirectory } from "@/lib/api";
import { Post } from "@/interfaces/Data";

export default async function Page() {
  const allPosts = await getAllPostsDirectory("dev");

  return (
    <div>
      <Title title="Dev" />
      <AppTab views={["table", "card"]} allPosts={allPosts} />
    </div>

  );
}
