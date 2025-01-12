'use client'
import { Json, ResumeData } from "@/interfaces/Data"
import ResumeCarousel from '@/components/AppComponents/Carousel';


function AppResume({ allJsons }: { allJsons: Json[] }) {
    const allResume: ResumeData[] = allJsons.map((resume) => JSON.parse(resume.fileContents))
    return (
        <div className="container mx-auto">
            {/* add width setting for mobile */}
            <ResumeCarousel resumeArray={allResume} />
        </div>
    )
}

export default AppResume