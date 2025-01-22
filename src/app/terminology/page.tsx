import { getAllContentsDirectory } from "@/lib/api";
import Title from "@/components/AppComponents/PrimaryTitle";
import AppTab from "@/components/AppComponents/Tab";
// import { Content } from "@/interfaces/Data";

export default async function Page() {
  const allContent = await getAllContentsDirectory("terminology");

  return (
    <div>
      <Title title="Terminology" />
      <AppTab views={["table", "card"]} allContent={allContent} />
    </div>
  );
}