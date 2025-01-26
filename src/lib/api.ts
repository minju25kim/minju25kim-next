import { Content } from "@/interfaces/Data";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!backendUrl) {
  throw new Error(
    "NEXT_PUBLIC_BACKEND_URL is not defined. Please set it in your environment variables."
  );
}

export async function fetchContentTitle(id: string): Promise<string> {
  try {
    const response = await fetch(`${backendUrl}/content/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch content");
    }
    const post = await response.json();
    return post.title;
  } catch (error) {
    console.error("Error fetching content:", error);
    return "";
  }
}

export async function getContentById(id: string): Promise<Content> {
  try {
    const response = await fetch(`${backendUrl}/content/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }
    const post: Content = await response.json();
    return post;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      _id: "error",
      title: "Error fetching content",
      content:
        "There was an error connecting to the backend. Please try again later.",
      author: "System",
      date: new Date().toISOString(),
      coverImage: "",
      keywords: [],
      ogImage: { url: "" },
      dir: "unknown",
      excerpt: "Error occurred while fetching the content.",
    };
  }
}

export async function getAllContentsDirectory(dir: string): Promise<Content[]> {
  try {
    const response = await fetch(`${backendUrl}/content/dir/${dir}`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const posts: Content[] = await response.json();
    return posts.sort((post1, post2) => {
      const date1 = new Date(post1.date);
      const date2 = new Date(post2.date);
      return date2.getTime() - date1.getTime();
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}


