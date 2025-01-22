import Title from "@/components/AppComponents/PrimaryTitle";
import {  getAllResume } from "@/lib/api";
import Resume from "@/components/AppComponents/Resume"


export default async function Page() {
  const allResume =  await getAllResume();
  return (
    <div>
      <Title title="Resume" />
      <Resume allResume={allResume} />
    </div>

  );
}