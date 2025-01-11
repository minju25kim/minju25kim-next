import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ResumeData } from "@/interfaces/Data"

function CarouselOrientation({ resumeArray }: { resumeArray: ResumeData[] }) {
    console.log(resumeArray)
    const orientation = 'vertical'
    return (
        <Carousel
            opts={{
                align: "start",
                loop: false,
            }}
            orientation={orientation}
            className="w-full max-w-xs"
        >
            <CarouselContent className="-mt-1 h-[200px]">
                {resumeArray.map((resume) => (
                    <CarouselItem key={resume.meta.title} className="pt-1 md:basis-1/2">
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex items-center justify-center p-6">
                                    <span className="text-3xl font-semibold">{resume.meta.title}</span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default CarouselOrientation