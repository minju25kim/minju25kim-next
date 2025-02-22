import Title from "@/components/AppComponents/PrimaryTitle";
import Link from "next/link";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/components/icons";
import SecondaryTitle from "@/components/AppComponents/SecondaryTitle";
import { MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Cards from "@/components/AppComponents/Cards";
import { Content } from '@/interfaces';
import { getAllContent } from "@/lib/api";
import RealTimeClock from "@/components/AppComponents/RealTmeClock";
// import { Introduction } from "@/components/AppComponents/Introduction";

const links = [
  { title: 'github', url: 'https://github.com/minju25kim', icon: GitHubIcon },
  { title: 'linkedin', url: 'https://www.linkedin.com/in/minju25kim/', icon: LinkedInIcon },
  { title: 'twitter', url: 'https://x.com/cleaner_than_u', icon: TwitterIcon },
  { title: 'email', url: 'mailto:minju25kim@gmail.com', icon: MailIcon },
];

export default async function Page() {
  const contents: Content[] = await getAllContent()

  return (
    <>
      <div className="flex flex-col items-center md:items-start mb-4">
        <Title title="Minju Kim" />
        <span className="text-pretty text-md text-muted-foreground pb-2">
          Fullstack Developer
        </span>
        <RealTimeClock />
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
      {/* <Badge /> */}
      {/* <Introduction  /> */}
      <div className="flex flex-col mx-auto w-full mt-2">
        <SecondaryTitle title="Latest contents" />
        <Cards allContent={contents} />
      </div>
    </>
  );
}
