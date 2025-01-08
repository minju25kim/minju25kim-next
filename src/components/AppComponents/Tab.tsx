import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export function AppTabs() {
    return (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="table">Table</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>
            <TabsContent value="table">
                {/* {Table} */}
            </TabsContent>
            <TabsContent value="calendar">
                {/* {Calendar} */}
            </TabsContent>
        </Tabs>
    )
}

export default AppTabs