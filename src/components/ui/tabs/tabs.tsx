import React, { useState } from "react"

export function Tabs({ children, defaultValue }: React.PropsWithChildren<{ defaultValue: string }>) {
    const [active, setActive] = useState(defaultValue)
    return React.Children.map(children, (child: any) =>
        React.cloneElement(child, { active, setActive })
    )
}

export function TabsList({ children, className, active, setActive }: any) {
    return (
        <div className={`flex gap-2 ${className ?? ""}`}>
            {React.Children.map(children, (child: any) =>
                React.cloneElement(child, { active, setActive })
            )}
        </div>
    )
}

export function TabsTrigger({ children, value, active, setActive }: any) {
    return (
        <button
            className={`px-4 py-2 rounded ${active === value ? "bg-orange-500 text-white" : "bg-transparent"}`}
            onClick={() => setActive(value)}
        >
            {children}
        </button>
    )
}

export function TabsContent({ children, value, active, className }: any) {
    if (active !== value) return null
    return <div className={className}>{children}</div>
}