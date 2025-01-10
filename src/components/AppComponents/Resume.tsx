import { Json, ResumeData } from "@/interfaces/Data"
import Link from "next/link"

function AppResume({ lang, allJsons }: { lang: string, allJsons: Json[] }) {
    const filteredResume: ResumeData[] = []

    allJsons.map(({ fileContents }) => {
        if (lang === JSON.parse(fileContents).lang) {
            filteredResume.push(JSON.parse(fileContents))
        }
    })
    return (
        <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2"
        >
            {
                filteredResume.map((resume: ResumeData) => {
                    return (

                        <div
                            key={resume.version}
                            className="bg-white border border-gray-300 rounded-lg shadow-md p-6 my-1 mx-auto w-full aspect-[1/1.414] flex flex-col justify-between"
                        >
                            <Link href={`/resume/${resume.version}`}>hi</Link>
                            <h1>{resume.version}</h1>
                        </div>
                    )
                })
            }


        </div >
    )
}


export default AppResume