import React from "react"

export default function Badge({ children, className, variant }: { children: React.ReactNode; className?: string; variant?: string }) {
    let base = "inline-block px-2 py-1 rounded text-xs font-semibold"
    if (variant === "default") base += " bg-orange-500 text-white"
    else base += " bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
    return <span className={`${base} ${className ?? ""}`}>{children}</span>
}