import { getAllPostsDirectory } from "@/lib/api";
import Title from "@/components/AppComponents/PrimaryTitle";
import AppTab from "@/components/AppComponents/Tab"

export default async function Page() {
  const allPosts = await getAllPostsDirectory("til");

  return (
    <div>
      <Title title="TIL" />
      <AppTab views={["table", "calendar"]} allPosts={allPosts} />
    </div>
  );
} 