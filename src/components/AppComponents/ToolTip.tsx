import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


export default function AppToolTip() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>Hover</TooltipTrigger>
                <TooltipContent>
                    <p>Add to library</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
}