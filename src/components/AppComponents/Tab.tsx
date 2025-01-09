"use client"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Post } from "@/interfaces/post";

import Table from '@/components/AppComponents/Table';
import Card from '@/components/AppComponents/Card'
import Calendar from "@/components/AppComponents//Calendar";
import { usePathname } from "next/navigation";

type AppTabsProps = {
    allPosts?: Post[];
    views: string[]
};

function DirectorySlug() {
    const pathname = usePathname();

    const [directory, slug] = pathname
        .split("/")
        .filter((segment) => segment.length > 0);

    return { directory, slug };
}


function AppTab({ views, allPosts = [] }: AppTabsProps) {
    // console.log(DirectorySlug())
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
                            <Table directory={directory} allPosts={allPosts} />
                            : null}
                        {view === 'calendar' ?
                            <Calendar directory={directory} allPosts={allPosts} />
                            : null}
                        {view === 'card' ?
                            <Card directory={directory} allPosts={allPosts} />
                            : null}
                        {view === 'kor' ?
                            'this will be resume view'
                            : null}
                        {view === 'eng' ?
                            'this will be resume view'
                            : null}
                    </TabsContent>
                )
            })}
        </Tabs >
    );
}

export default AppTab