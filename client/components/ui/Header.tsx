"use client";
import { useGlobalContext } from "@/context/globalContext";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, User, UserPlus } from "lucide-react";

function Header() {

    const { isAuthenticated } = useGlobalContext();
    const pathname = usePathname();
    return <header className="px-10 py-6 bg-slate-100 text-gray-500 flex justify-between items-center">
        <Link href={"/"} className ="flex items-center gap-2">
            <Image src="/quickchores.png" alt="logo" width={60} height={60} className="rounded-xl shadow-xl transition-transform duration-500 hover:scale-105" />
            <h1 className="text-2xl font-extrabold text-[#7263f3]">Quick Chores</h1>
        </Link>

        <ul className="flex items-center gap-8">
            <li>
                <Link href={"/findchores"} className={`py-2 px-6 ${pathname === "findchores"
                    ? "text-[#7263f3] border-[#7263f3] border bg-[#7263f3]/10"
                    : ""
                    }`}>
                    Find Chores
                </Link>
            </li>
            <li>
                <Link href={"/mychores"} className={`py-2 px-6 ${pathname === "mychores"
                    ? "text-[#7263f3] border-[#7263f3] border bg-[#7263f3]/10"
                    : ""
                    }`}>
                    My Chores
                </Link>
            </li>
            <li>
                <Link href={"/postchore"} className={`py-2 px-6 ${pathname === "postchore"
                    ? "text-[#7263f3] border-[#7263f3] border bg-[#7263f3]/10"
                    : ""
                    }`}>
                    Post A Chore
                </Link>
            </li>
        </ul>

        <div className="flex items-center gap-4">
            {isAuthenticated ? (
                <div>Profile</div>
            ) : (
                <div className="flex items-center gap-6">
                    <Link href={"http://localhost:8000/login"} className="py-2 px-6 gap-4 rounded-md border flex items-center bg-[#7263f3] border-[#7263f3] text-white hover:bg-[#7263f3]/90 transition-all duration-200 ease-in-out">
                    <LogIn className="w-4 h-4" />
                        Login
                    </Link>
                    <Link href={"http://localhost:8000/login"} className="py-2 px-6 gap-4 rounded-md border flex items-center border-[#7263f3] text-[7263f3] hover:bg-[#7263f3]/10 transition-all duration-200 ease-in-out">
                    <UserPlus className="w-4 h-4" />
                        Register
                    </Link>
                </div>
            )}
        </div>

    </header >;
}

export default Header;