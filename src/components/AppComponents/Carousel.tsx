import * as React from "react"
import { Card } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ResumeData } from "@/interfaces/Data"
import { useIsMobile } from "@/hooks/use-mobile"

function CarouselOrientation({ resumeArray }: { resumeArray: ResumeData[] }) {
    const [selectedResume, setSelectedResume] = React.useState<ResumeData | null>(null)
    const isMobile = useIsMobile()

    const handleItemClick = (resume: ResumeData) => {
        setSelectedResume(resume)
    }
    return (
        <div className="flex flex-col md:flex-row  items-center gap-2">
            {selectedResume ? (
                <div className="w-full max-w-screen-md p-8 bg-white shadow-md border" style={{ aspectRatio: '1 / 1.414' }}>
                    <h1 className="text-2xl font-bold">{selectedResume.meta.title}</h1>
                </div>
            ) : (
                <div className="w-full max-w-screen-md p-8 bg-white shadow-md border" style={{ aspectRatio: '1 / 1.414' }}>
                    <h1 className="text-2xl font-bold">{resumeArray[0].meta.title}</h1>
                </div>
            )}
            <Carousel
                opts={{
                    align: "start",
                    loop: false,
                }}
                orientation={isMobile ? 'horizontal' : 'vertical'}
                className="max-w-xs"
            >
                <CarouselContent className="">
                    {resumeArray.map((resume) => (
                        <CarouselItem
                            key={resume.meta.title}
                            className=""
                            onClick={() => handleItemClick(resume)}
                        >
                            <Card className="w-40" style={{ aspectRatio: '1 / 1.414' }}>
                                <span className="text-base font-semibold">
                                    {resume.meta.title}
                                </span>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CarouselOrientation
