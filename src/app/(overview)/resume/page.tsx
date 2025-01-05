import AppBreadCrumb from "@/components/BreadCrumb";
import Title from "@/components/PrimaryTitle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume"
};
export default function Page() {
  return (
    <>
      <AppBreadCrumb directory="resume" />
      <Title title="Resume" />
    </>

  );
}
