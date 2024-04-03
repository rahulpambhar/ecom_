"use client";
import React, { useState } from "react";
import Sidebar from "@/components/admin/sidebar";
import { useSession } from "next-auth/react";
import { usePathname, redirect } from "next/navigation";


export default function Template({ children }: any) {
    const pathname = usePathname();
    const { data: session, status }: any = useSession();
    
    return (
        <div id="root">
            {children}
            {status === "authenticated" && session?.user?.isAdmin && pathname.startsWith("/admin") && <Sidebar />}
        </div>
    );
}
