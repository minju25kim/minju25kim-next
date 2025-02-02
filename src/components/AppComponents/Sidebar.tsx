"use client"; // Add this line at the top of the file

// import { useState } from 'react';
import { Calendar, Home, FolderCode, Book, Paperclip } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    // SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    // SidebarClose
} from "@/components/ui/sidebar";
import Link from "next/link";

const items = [
    { title: 'Home', url: '/', icon: Home },
    { title: 'Dev', url: '/dev', icon: FolderCode },
    { title: 'Resume', url: '/resume', icon: Paperclip },
    { title: 'Terminology', url: '/terminology', icon: Book },
    { title: 'TIL', url: '/til', icon: Calendar },
];

function AppSidebar() {
    // const [isSidebarVisible, setSidebarVisible] = useState(true);

    // const toggleSidebar = () => {
    //     setSidebarVisible(!isSidebarVisible);
    // };

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    {/* <SidebarClose className="absolute right-0 top-0" onClick={toggleSidebar} /> */}
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