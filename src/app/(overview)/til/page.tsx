import { getAllPostsDirectory } from "@/lib/api";
import Title from "@/components/AppComponents/PrimaryTitle";
import AppTab from "@/components/AppComponents/Tab"
import { Post } from "@/interfaces/Data";


export default async function Page() {
  let allPosts: Post[] = []
  async function fetchAllPosts() {
    try {
      const allPosts = await getAllPostsDirectory("til");
      return allPosts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  }

  fetchAllPosts().then(posts => {
    console.log(posts);
    allPosts = posts
  }).catch(error => {
    console.error("Unexpected error:", error);
  });

  return (
    <div>
      <Title title="TIL" />
      <AppTab views={["table", "calendar"]} allPosts={allPosts} />
    </div>
  );
} 