import React, { useState } from "react"

export default function Switch({ checked, onChange }: { checked?: boolean; onChange?: (v: boolean) => void }) {
    const [isOn, setIsOn] = useState(checked ?? false)
    return (
        <button
            type="button"
            aria-pressed={isOn}
            onClick={() => {
                setIsOn(!isOn)
                onChange?.(!isOn)
            }}
            className={`w-10 h-6 rounded-full border flex items-center px-1 ${isOn ? "bg-orange-500" : "bg-gray-300"}`}
        >
            <span
                className={`block w-4 h-4 rounded-full bg-white shadow transform transition ${
                    isOn ? "translate-x-4" : ""
                }`}
            />
        </button>
    )
}