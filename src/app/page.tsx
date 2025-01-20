import Title from "@/components/AppComponents/PrimaryTitle";
import Link from "next/link";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/components/icons";
import { getAllPosts } from '@/lib/api'
import SecondaryTitle from "@/components/AppComponents/SecondaryTitle";
import { GlobeIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button"
import Card from "@/components/AppComponents/Card";
import { Post } from '@/interfaces/Data'
// import AppTab from "@/components/AppComponents/Tab"
import Badge from "@/components/AppComponents/Badge";

const links = [
  { title: 'github', url: 'https://github.com/minju25kim', icon: GitHubIcon },
  { title: 'linkedin', url: 'https://www.linkedin.com/in/minju25kim/', icon: LinkedInIcon },
  { title: 'twitter', url: 'https://x.com/cleaner_than_u', icon: TwitterIcon },
  { title: 'email', url: 'mailto:minju25kim@gmail.com', icon: MailIcon },
];

async function Home() {
  const allPosts: Post[] = await getAllPosts()
  return (
    <>
      <div className="flex flex-col items-center md:items-start mb-4">
        <Title title="Minju Kim" />
        <span className="text-pretty text-md text-muted-foreground pb-2">
          Fullstack Developer
        </span>
        <a
          href="https://www.google.com/maps/place/seoul"
          className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline max-w-md items-center text-pretty text-xs text-muted-foreground"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GlobeIcon className="size-3" />
          <span>Seoul, South Korea</span>
        </a>
        <div className="flex flex-row flex-wrap justify-center sm:justify-start gap-2 mt-4">
          {links.map((link) => (
            <Button
              key={link.title}
              className="size-8"
              variant="outline"
              size="icon"
              asChild
            >
              <Link href={link.url} rel="noopener noreferrer" target="_blank"
              ><link.icon className="size-4" /></Link>
            </Button>
          ))}
        </div>
      </div>
      <Badge />
      <div className="flex flex-col mx-auto w-full mt-2">
        {/* <SecondaryTitle title="Featured posts" />
        based on the view count of the post */}
        <SecondaryTitle title="Latest posts" />
        {/* <AppTab views={["table", "card"]} allPosts={allPosts} /> */}
        <Card allPosts={allPosts} />
      </div>
    </>
  );
}

export default Home;