"use client"; // Add this line at the top of the file

import Link from "next/link";
import { Calendar, Home, FolderCode, Paperclip, BookType, NotebookText } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";

const items = [
    { title: 'Home', url: '/', icon: Home },
    { title: 'Blog', url: '/blog', icon: NotebookText },
    { title: 'Dev', url: '/dev', icon: FolderCode },
    { title: 'Resume', url: '/resume', icon: Paperclip },
    { title: 'Terminology', url: '/terminology', icon: BookType },
    { title: 'TIL', url: '/til', icon: Calendar },
];

function AppSidebar() {

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}

export default AppSidebar;