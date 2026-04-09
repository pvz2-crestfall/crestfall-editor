import { clsx, type ClassValue } from 'clsx';
import React, { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toRTID(input: string, rtidType: RTIDTypes) {
    return `RTID(${input}@${rtidType})`;
}
export function fromRTID(input: string): { name: string; type: RTIDTypes } {
    const rtidRegex = /RTID\((.+)@(.+)\)/;
    const match = input.match(rtidRegex);

    if (match) {
        const moduleName = match[1];
        const moduleType = match[2];

        return {
            name: moduleName,
            type: moduleType as RTIDTypes,
        };
    } else {
        throw new Error('Invalid RTID Passed!');
    }
}

export enum RTIDTypes {
    current = 'CurrentLevel',
    module = 'LevelModules',
    zombie = 'ZombieTypes',
    plant = 'PlantTypes',
    gridItem = 'GridItemTypes',
}

export function useOnScreen<T extends HTMLElement = HTMLElement>(ref: React.RefObject<T | null>) {
    const [isIntersecting, setIntersecting] = React.useState(false);

    const observer = React.useMemo(
        () => new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting)),
        [ref],
    );

    React.useEffect(() => {
        const element = ref.current;
        if (!element) return () => observer.disconnect();
        observer.observe(element);
        return () => observer.disconnect();
    }, [ref, observer]);

    return isIntersecting;
}

export const useOnPageLeave = (handler: () => void) => {
    useEffect(() => {
        const handleBeforeUnload = (event: any) => {
            handler();

            event.preventDefault();
            event.returnValue = true;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [handler]);
};
