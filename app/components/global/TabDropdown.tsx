"use client";

import { useEffect, useRef, useState } from "react";
import ChevronDown from "../icons/ChevronDown";

interface TabDropdownProps {
    tabs: { title: string }[];
    activeTab: string;
    onChange: (title: string) => void;
}

export default function TabDropdown({ tabs, activeTab, onChange }: TabDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const onClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, [isOpen]);

    return (
        <div ref={wrapperRef} className="relative w-full">
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className="font-alegreya-sans-sc flex w-full items-center justify-between gap-4 rounded-lg bg-[#231F1C]/50 px-6 py-3 text-lg cursor-pointer"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                {activeTab}
                <ChevronDown className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <ul
                    role="listbox"
                    className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-lg border border-[#231F1C] bg-background"
                >
                    {tabs.map((tab) => (
                        <li key={tab.title} role="option" aria-selected={activeTab === tab.title}>
                            <button
                                type="button"
                                onClick={() => {
                                    onChange(tab.title);
                                    setIsOpen(false);
                                }}
                                className={`font-alegreya-sans-sc w-full px-6 py-3 text-left text-lg transition-colors duration-300 cursor-pointer ${activeTab === tab.title ? "bg-[#231F1C]/50" : "hover:bg-[#231F1C]/30"}`}
                            >
                                {tab.title}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
