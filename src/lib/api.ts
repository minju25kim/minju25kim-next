import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = (dir: string) => join(process.cwd(), `content/${dir}`);

export function getPostSlugs(dir: string) {
    return fs.readdirSync(postsDirectory(dir));
}

export function getPostBySlug(dir: string, slug: string) {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = join(postsDirectory(dir), `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return { ...data, slug: realSlug, content, dir } as Post;
}

export function getAllPostsDirectory(dir: string): Post[] {
    const slugs = getPostSlugs(dir);
    const posts = slugs
        .map((slug) => getPostBySlug(dir, slug))
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}


export function getAllPosts(): Post[] {
    const directories = fs.readdirSync(postsDirectory("")).filter((file) => fs.statSync(postsDirectory(file)).isDirectory());
    let allPosts: Post[] = [];
    directories.forEach((dir) => {
        const slugs = getPostSlugs(dir);
        const posts = slugs
            .map((slug) => getPostBySlug(dir, slug))
            .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
        allPosts = allPosts.concat(posts);
    });
    return allPosts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}


