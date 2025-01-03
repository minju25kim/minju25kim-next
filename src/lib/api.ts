import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { join } from "path";

const postsDirectory = (dir: string) => join(process.cwd(), `content/${dir}`);

export function getPostSlugs(dir: string) {
    return fs.readdirSync(postsDirectory(dir));
}

export function getPostBySlug(dir: string, slug: string) {
    try {
        const realSlug = slug.replace(/\.md$/, "");
        const fullPath = join(postsDirectory(dir), `${realSlug}.md`);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);
        return { ...data, slug: realSlug, content } as Post;
    } catch (e) {
        console.log(e)
        notFound()
    }
}

export function getAllPosts(dir: string): Post[] {
    const slugs = getPostSlugs(dir);
    const posts = slugs
        .map((slug) => getPostBySlug(dir, slug))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}