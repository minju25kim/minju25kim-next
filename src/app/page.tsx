import AppBreadCrumb from "@/components/AppComponents/BreadCrumb";
import Title from "@/components/AppComponents/PrimaryTitle";
import Link from "next/link";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/components/icons";
import { getAllPosts } from '@/lib/api'
import SecondaryTitle from "@/components/AppComponents/SecondaryTitle";
import { GlobeIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button"

const links = [
  { title: 'github', url: 'https://github.com/minju25kim', icon: GitHubIcon },
  { title: 'linkedin', url: 'https://www.linkedin.com/in/minju25kim/', icon: LinkedInIcon },
  { title: 'twitter', url: 'https://x.com/cleaner_than_u', icon: TwitterIcon },
  { title: 'email', url: 'mailto:minju25kim@gmail.com', icon: MailIcon },
];

function Home() {
  const allPosts = getAllPosts()
  // console.log(allPosts)
  return (
    <>
      <AppBreadCrumb />
      <div className="flex flex-col items-center sm:items-start mb-4">
        <Title title="Minju Kim" />
        <a
          href="https://www.google.com/maps/place/seoul"
          className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline max-w-md items-center text-pretty text-xs text-muted-foreground"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GlobeIcon className="size-4" />
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
      <div className="flex flex-col ">
        <SecondaryTitle title="Hi, I&apos;m Minju Kim, 1 year experienced frontend developer." />
        <ul className="list-disc list-inside">
          <li>Typescript, javascript, nodejs</li>
          <li>HTML, CSS, tailwind, styled-components, MaterialUI</li>
          <li>Nextjs, Nestjs, react</li>
          <li>SQL, MongoDB</li>
          <li>Docker, github-actions</li>
        </ul>
      </div>
      <div className="flex flex-col">
        <SecondaryTitle title="Latest posts" />
        {
          allPosts.map((item) => (
            <Link key={item.slug} href={`/${item.dir}/${item.slug}`}>
              {item.title}
            </Link>
          ))
        }
      </div>
    </>
  );
}

export default Home;