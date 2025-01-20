import { getAllPostsDirectory } from "@/lib/api";
import Title from "@/components/AppComponents/PrimaryTitle";
import AppTab from "@/components/AppComponents/Tab";
import { Post } from "@/interfaces/Data";

export default async function Page() {
  let allPosts: Post[] = []
  async function fetchAllPosts() {
    try {
      const allPosts = await getAllPostsDirectory("terminology");
      return allPosts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Handle the error as needed, for example, return an empty array or null
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
    <>
      <Title title="Terminology" />
      <AppTab views={["table", "card"]} allPosts={allPosts} />
    </>
  );
}