import Title from "@/components/AppComponents/PrimaryTitle";
import AppTab from "@/components/AppComponents/Tab";
import { getAllContentsDirectory } from "@/lib/api";
// import { Content } from "@/interfaces/Data";

export default async function Page() {
  const allContent = await getAllContentsDirectory("blog");

  return (
    <div>
      <Title title="Blog" />
      <AppTab views={["table", "calendar"]} allContent={allContent} />
    </div>

  );
}
