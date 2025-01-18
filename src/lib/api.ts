import { Post } from "@/interfaces/Data";
// import { join } from "path";

export async function fetchTitle(id: string): Promise<string> {
  try {
      const response = await fetch(`http://localhost:3000/content/${id}`);
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
    const response = await fetch(`http://localhost:3000/content/${id}`);
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
    const response = await fetch(`http://localhost:3000/content/dir/${dir}`);
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
  const response = await fetch("http://localhost:3000/content");
  const posts: Post[] = await response.json();
  // console.log(posts);
  return posts.sort((post1, post2) => {
    const date1 = new Date(post1.date);
    const date2 = new Date(post2.date);
    return date2.getTime() - date1.getTime();
  });
}

// const jsonsDirectory = (dir: string) => join(process.cwd(), `json/${dir}`);

// export function getJsonSlugs(dir: string) {
//   return fs.readdirSync(jsonsDirectory(dir));
// }

// export function getJsonBySlug(dir: string, slug: string) {
//   const realSlug = slug.replace(/\.json$/, "");
//   const fullPath = join(jsonsDirectory(dir), `${realSlug}.json`);
//   const fileContents = fs.readFileSync(fullPath, "utf8");
//   return { slug: realSlug, fileContents };
// }

// export function getAllJsonsDirectory(dir: string) {
//   const slugs = getJsonSlugs(dir);
//   const jsons = slugs.map((slug) => getJsonBySlug(dir, slug));
//   return jsons;
// }

// export function getAllJsons() {
//   // const directories = fs.readdirSync(jsonsDirectory("")).filter((file) => fs.statSync(jsonsDirectory(file)).isDirectory());
//   let allJsons: Json[] = [];
//   const slugs = getJsonSlugs("");
//   const jsons = slugs
//     .map((slug) => getJsonBySlug("", slug))
//     .sort((a, b) =>
//       JSON.parse(a.fileContents).meta.createdTime >
//       JSON.parse(b.fileContents).meta.createdTime
//         ? -1
//         : 1
//     );
//   allJsons = allJsons.concat(jsons);
//   return allJsons;
// }
