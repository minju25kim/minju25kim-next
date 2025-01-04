import Title from "@/components/Title";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dev"
};
export default function Page() {
  return (

    <div>
      <Title title="Dev" />
    </div>

  );
}
