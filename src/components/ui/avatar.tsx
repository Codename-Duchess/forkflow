import React from "react"

export function Avatar({ children, className }: React.PropsWithChildren<{ className?: string }>) {
    return <span className={`inline-flex items-center justify-center rounded-full bg-gray-200 overflow-hidden ${className ?? ""}`}>{children}</span>
}

export function AvatarImage({ src, alt }: { src?: string; alt?: string }) {
    return src ? <img src={src} alt={alt} className="w-full h-full object-cover rounded-full" /> : null
}

export function AvatarFallback({ children }: React.PropsWithChildren<{}>) {
    return <span className="text-lg font-bold text-gray-600">{children}</span>
}