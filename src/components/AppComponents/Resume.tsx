import { Json, ResumeData } from "@/interfaces/Data"
// import Link from "next/link"
import CarouselOrientation from "./Carousel"

function AppResume({ allJsons }: { allJsons: Json[] }) {

    const [featured, ...archived] = allJsons
    const featuredResume: ResumeData = JSON.parse(featured.fileContents)
    const archivedResume: ResumeData[] = archived.map((resume) => JSON.parse(resume.fileContents))

    return (
        <div className="container flex flex-col md:flex-row md:justify-between">
            <div className="p-4 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold">{featuredResume.meta.title}</h1>
            </div>
            <div className="">
                <CarouselOrientation resumeArray={archivedResume} />
            </div>
        </div >
    )
}


export default AppResume