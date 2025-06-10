import BlogPostClient from './BlogPostClient';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPostClient category="blog" slug={params.slug} />;
}
