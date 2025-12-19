"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart2, Settings, Droplets } from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();

    const navigation = [
        { name: "Home", href: "/", icon: Home },
        { name: "Reports", href: "/reports", icon: BarChart2 },
        { name: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <div className="hidden h-screen w-64 flex-col border-r bg-white dark:bg-zinc-950 md:flex">
            <div className="flex h-16 items-center px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Droplets className="h-6 w-6 text-blue-500" />
                    <span>Water Tracker</span>
                </Link>
            </div>
            <nav className="flex-1 space-y-1 px-4 py-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
                                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                                }`}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="border-t p-4">
                {/* User profile placeholder */}
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                    <div className="text-sm">
                        <p className="font-medium">User</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
