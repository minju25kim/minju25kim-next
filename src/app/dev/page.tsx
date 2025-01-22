import Title from "@/components/AppComponents/PrimaryTitle";
import AppTab from "@/components/AppComponents/Tab";
import { getAllContentsDirectory } from "@/lib/api";
// import { Content } from "@/interfaces/Data";

export default async function Page() {
  const allContent = await getAllContentsDirectory("dev");

  return (
    <div>
      <Title title="Dev" />
      <AppTab views={["table", "card"]} allContent={allContent} />
    </div>

  );
}
