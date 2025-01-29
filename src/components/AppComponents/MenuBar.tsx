import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"

function AppMenuBar({ views }: { views: string[] }) {
    // console.log(views)
    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
                <MenubarContent>
                    {views.map((view: string) => {
                        return (
                            <MenubarItem key={view}>{view}</MenubarItem>
                        )
                    }
                    )}
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}

export default AppMenuBar