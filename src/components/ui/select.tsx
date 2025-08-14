import React from "react"

export default function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <select {...props} className={`border rounded px-3 py-2 bg-white dark:bg-gray-800 ${props.className ?? ""}`}>
            {children}
        </select>
    )
}