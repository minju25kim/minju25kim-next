import { Post } from "@/interfaces/Data";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchTitle(id: string): Promise<string> {
  try {
    const response = await fetch(`${backendUrl}/content/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }
    const post = await response.json();
    return post.title;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}

export async function getPostById(id: string): Promise<Post> {
  try {
    const response = await fetch(`${backendUrl}/content/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }
    const post: Post = await response.json();
    return post;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export async function getAllPostsDirectory(dir: string): Promise<Post[]> {
  try {
    const response = await fetch(`${backendUrl}/content/dir/${dir}`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const posts: Post[] = await response.json();
    return posts.sort((post1, post2) => {
      const date1 = new Date(post1.date);
      const date2 = new Date(post2.date);
      return date2.getTime() - date1.getTime();
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${backendUrl}/content`);
    if (!response.ok) {
      throw new Error(`Error fetching posts: ${response.statusText}`);
    }

    const posts: Post[] = await response.json();
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
