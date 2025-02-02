"use client"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Content } from "@/interfaces/Data";

import Table from '@/components/AppComponents/Table';
import Card from '@/components/AppComponents/Cards'
import Calendar from "@/components/AppComponents//Calendar";
import { usePathname } from "next/navigation";

type AppTabsProps = {
    allContent?: Content[];
    views: string[];
};

function DirectorySlug() {
    const pathname = usePathname();

    const [directory, slug] = pathname
        .split("/")
        .filter((segment) => segment.length > 0);

    return { directory, slug };
}


function AppTab({ views, allContent = [] }: AppTabsProps) {
    const { directory } = DirectorySlug();

    return (
        <Tabs defaultValue="table" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                {views.map((view: string) => {
                    return (
                        <TabsTrigger value={view} key={view}>{view}</TabsTrigger>
                    )
                })}
            </TabsList>
            {views.map((view: string) => {
                return (
                    <TabsContent value={view} key={view}>
                        {view === 'table' ?
                            <Table directory={directory} allContent={allContent} />
                            : null}
                        {view === 'calendar' ?
                            <Calendar directory={directory} allContent={allContent} />
                            : null}
                        {view === 'card' ?
                            <Card directory={directory} allContent={allContent} />
                            : null}
                    </TabsContent>
                )
            })}
        </Tabs >
    );
}

export default AppTab