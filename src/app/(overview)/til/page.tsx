import { getAllPostsDirectory } from "@/lib/api";
import Title from "@/components/AppComponents/PrimaryTitle";
import AppTab from "@/components/AppComponents/Tab"
import { Post } from "@/interfaces/Data";


export default async function Page() {
  const allPosts: Post[] = await getAllPostsDirectory("til");

  return (
    <div>
      <Title title="TIL" />
      <AppTab views={["table", "calendar"]} allPosts={allPosts} />
    </div>
  );
} 