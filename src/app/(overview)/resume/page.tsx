import Title from "@/components/AppComponents/PrimaryTitle";
import { getAllJsons } from "@/lib/api";
import Resume from "@/components/AppComponents/Resume"


export default function Page() {
  const allJsons = getAllJsons();
  // console.log(allJsons)
  return (
    <>
      <Title title="Resume" />
      <Resume allJsons={allJsons} />
    </>

  );
}