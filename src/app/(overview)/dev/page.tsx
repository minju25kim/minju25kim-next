import Title from "@/components/AppComponents/PrimaryTitle";
import AppTab from "@/components/AppComponents/Tab";

export default function Page() {
  return (
    <>
      <Title title="Dev" />
      <AppTab views={["table", "card"]} />
    </>

  );
}
