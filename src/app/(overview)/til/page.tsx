// import Container from "@/app/_components/container";
// import { HeroPost } from "@/app/_components/hero-post";
// import { Intro } from "@/app/_components/intro";
// import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";
import Link from "next/link";

export default function Page() {
  const allPosts = getAllPosts("til");

  // const heroPost = allPosts[0];

  // const morePosts = allPosts.slice(1);
  console.log(allPosts)
  return (
    <main>
      til
      {allPosts.map((post) => {
        return (
          <div key={post.slug}>
            <Link href={`/til/${post.slug}`} key={post.slug}>
              {post.title}
            </Link>
          </div>
        );
      })}
      {/* <Container>
        <Intro />
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        />
      </Container> */}
    </main>
  );
}