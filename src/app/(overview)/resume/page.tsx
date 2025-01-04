import Title from "@/components/Title";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume"
};
export default function Page() {
  return (
    <div>
      <Title title="Resume" />
    </div>

  );
}
