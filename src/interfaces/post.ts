export type Post = {
    dir: string;
    slug: string;
    title: string;
    date: string;
    coverImage: string;
    excerpt: string;
    ogImage: {
        url: string;
    };
    content: string;
    preview?: boolean;
};

