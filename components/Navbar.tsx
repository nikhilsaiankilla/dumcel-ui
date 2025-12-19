"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import ProfileDropdown from "./profile-dropdown";

interface User {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    credits: number;
    isGitConnected: boolean;
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    // Array of action buttons
    const actionLinks: { href: string; label: string; variant: "outline" | "default" | "link" | "destructive" | "secondary" | "ghost" }[] = [
        { href: "/login", label: "Log In", variant: "outline" },
        { href: "/signup", label: "Sign up", variant: "default" },
        { href: "https://nikhilsai.in", label: "Meet the Developer", variant: "outline" },
    ];

    const fetchData = async (token: string) => {
        try {
            const res = await fetch(`/api/auth/get-user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!res.ok) {
                const text = await res.json();
                throw new Error(`${text.error}`);
            }

            const json = await res.json();
            if (!json.success) throw new Error(json.message || "Failed to fetch user data");

            setUser(json.data);
        } catch (err: unknown) {
            console.error("Error fetching user:", err);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchData(token);
        }
    }, []);

    console.log(user);

    return (
        <nav className="w-full px-5 md:px-10 lg:px-20 py-4 flex items-center justify-between bg-background">
            <div className="w-full md:w-auto flex items-end justify-between gap-5">
                <Link href="/" className="flex items-end gap-2">
                    <Image src="/logo.png" alt="logo" width={40} height={40} className="cursor-pointer" />
                    <span className="text-white font-semibold text-xl hidden md:block">Dumcel</span>
                </Link>

                {
                    user && <div className="md:hidden">
                        <ProfileDropdown user={user} loading={false} error={null} />
                    </div>
                }

                {
                    isOpen
                        ?
                        <X size={25} onClick={() => setIsOpen(false)} className={`block md:hidden cursor-pointer ${user ? "hidden" : ""}`} />
                        :
                        <Menu size={25} onClick={() => setIsOpen(true)} className={`block md:hidden cursor-pointer ${user ? "hidden" : ""}`} />
                }
            </div>

            <div className="hidden md:flex items-center gap-4">
                {
                    user ? <ProfileDropdown user={user} loading={false} error={null} /> : actionLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="text-gray-300 text-sm cursor-pointer">
                            <Button variant={link.variant} className="cursor-pointer px-3 py-1">
                                {link.label}
                            </Button>
                        </Link>
                    ))
                }
            </div>

            <div className={`w-full flex flex-col md:hidden absolute left-0 bg-background transition-all duration-300 ease-in-out overflow-hidden z-50 px-5 py-10 space-y-5 ${isOpen ? "top-16" : "-top-2/4"}`}>
                <div className="flex items-center flex-col gap-4">
                    {
                        !user && actionLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="text-gray-300 text-sm cursor-pointer w-full">
                                <Button variant={link.variant} className="cursor-pointer px-3 py-1 w-full">
                                    {link.label}
                                </Button>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
