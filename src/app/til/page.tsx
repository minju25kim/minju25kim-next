import { getAllContentsDirectory } from "@/lib/api";
import Title from "@/components/AppComponents/PrimaryTitle";
import AppTab from "@/components/AppComponents/Tab"
import { Content } from "@/interfaces/Data";


export default async function Page() {
  // const allContent: Content[] = await getAllContentsDirectory("til");
  let allContent: Content[] = [];
  try {
    allContent = await getAllContentsDirectory("til");
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
  return (
    <div>
      <Title title="TIL" />
      <AppTab views={["table", "calendar"]} allContent={allContent} />
    </div>
  );
} 