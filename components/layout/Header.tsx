"use client";

import Link from "next/link";
import { Menu, Droplets } from "lucide-react";

export function Header() {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 dark:bg-zinc-950 md:hidden">
            <Link href="/" className="flex items-center gap-2 font-semibold">
                <Droplets className="h-6 w-6 text-blue-500" />
                <span>Water Tracker</span>
            </Link>
            <button className="rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
            </button>
        </header>
    );
}
