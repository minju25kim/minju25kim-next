import AppBreadCrumb from "@/components/AppComponents/BreadCrumb";
import Title from "@/components/AppComponents/PrimaryTitle";
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
