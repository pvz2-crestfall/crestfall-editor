import { cn } from '@/lib/utils';
import { useState, type ReactNode } from 'react';

interface Tab {
    label: string;
    content: ReactNode;
}

interface TabSwitchProps {
    tabs: Tab[];
    defaultIndex?: number;
}

export function TabSwitch({ tabs, defaultIndex = 0 }: TabSwitchProps) {
    const [activeIndex, setActiveIndex] = useState(defaultIndex);

    return (
        <div className="w-full max-w-xl mx-auto">
            {/* Tab Buttons */}
            <div className="flex border-b border-gray-300">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`flex-1 text-center py-2 px-3 transition-colors duration-300 
                            ${
                                activeIndex === index
                                    ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div
                key={activeIndex} // re-trigger animation on tab change
                className="p-4 transition-opacity duration-300 ease-in-out opacity-100 animate-fadeIn"
            >
                {tabs[activeIndex].content}
            </div>
        </div>
    );
}

export function x({ tabs, defaultIndex = 0 }: TabSwitchProps) {
    const [activeIndex, setActiveIndex] = useState(defaultIndex);

    return (
        <div className="w-full max-w-xl mx-auto rounded-md border border-border bg-card text-card-foreground">
            {/* Tab Buttons */}
            <div className="flex border-b border-border">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={cn(
                            'flex-1 text-center py-2 px-3 text-sm transition-colors duration-300',
                            activeIndex === index
                                ? 'border-b-2 border-primary text-primary font-medium'
                                : 'text-muted-foreground hover:text-foreground',
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div key={activeIndex} className="p-4 transition-opacity duration-300 ease-in-out animate-fadeIn">
                {tabs[activeIndex].content}
            </div>
        </div>
    );
}
