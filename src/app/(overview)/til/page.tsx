import { getAllPostsDirectory } from "@/lib/api";
import Title from "@/components/AppComponents/PrimaryTitle";
import AppTab from "@/components/AppComponents/Tab"

export default function Page() {
  const allPosts = getAllPostsDirectory("til");

  return (
    <div className="w-full">
      <Title title="TIL" />
      <AppTab views={["table", "calendar"]} allPosts={allPosts} />
    </div>
  );
}