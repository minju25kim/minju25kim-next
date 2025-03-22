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
import UnderConstruction from '@/app/components/UnderConstruction';
// import { Introduction } from "@/components/AppComponents/Introduction";

const links = [
  { title: 'github', url: 'https://github.com/minju25kim', icon: GitHubIcon },
  { title: 'linkedin', url: 'https://www.linkedin.com/in/minju25kim/', icon: LinkedInIcon },
  { title: 'twitter', url: 'https://x.com/cleaner_than_u', icon: TwitterIcon },
  { title: 'email', url: 'mailto:minju25kim@gmail.com', icon: MailIcon },
];

export default function Page() {
  return <UnderConstruction />;
}
