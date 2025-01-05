import AppBreadCrumb from "@/components/BreadCrumb";
import Title from "@/components/PrimaryTitle";
import Image from 'next/image';
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { getAllPosts } from '@/lib/api'
import SecondaryTitle from "@/components/SecondaryTitle";

const links = [
  { title: 'github', url: 'https://github.com/minju25kim', icon: Github },
  { title: 'linkedin', url: 'https://www.linkedin.com/in/minju25kim/', icon: Linkedin },
  { title: 'twitter', url: 'https://x.com/cleaner_than_u', icon: Twitter },
  { title: 'email', url: 'mailto:minju25kim@gmail.com', icon: Mail },
];

function Home() {
  const allPosts = getAllPosts()
  console.log(allPosts)
  return (
    <>
      <AppBreadCrumb />
      <div className="flex flex-col items-center sm:items-start mb-4">
        <Title title="Minju Kim" />
        <p className="text-center sm:text-justify"><a href="https://maps.app.goo.gl/RsnpuVuQdiM7z8eL9">Seoul, South Korea</a></p>
        <div className="flex flex-row flex-wrap justify-center sm:justify-start">
          {links.map((link) => (
            <Link key={link.title} href={link.url}><link.icon /></Link>
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
      <div className="flex flex-col ">
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