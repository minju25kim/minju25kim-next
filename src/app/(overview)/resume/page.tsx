import Title from "@/components/AppComponents/PrimaryTitle";
import AppTab from "@/components/AppComponents/Tab";
import { getAllJsons } from "@/lib/api";


export default function Page() {
  const allJsons = getAllJsons();
  return (
    <>
      <Title title="Resume" />
      <AppTab views={["kor", "eng"]} allJsons={allJsons} />
    </>

  );
}