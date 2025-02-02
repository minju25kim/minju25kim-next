import { Content } from "@/interfaces/Data";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getContentById(id: string): Promise<Content> {
  try {
    const url = `${backendUrl}/content/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
    const post: Content = await response.json();
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error
  }
}

export async function getAllContentsDirectory(dir: string): Promise<Content[]> {
  try {
    const response = await fetch(`${backendUrl}/content/dir/${dir}`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const contents: Content[] = await response.json();
    return contents
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}


export async function getAllContent(): Promise<Content[]> {
  try {
    const response = await fetch(`${backendUrl}/content`);
    if (!response.ok) {
      throw new Error(`Error fetching contents: ${response.statusText}`);
    }
    const contents: Content[] = await response.json();
    return contents
  } catch (error) {
    console.error("Error fetching contents:", error);
    return [];
  }
}
