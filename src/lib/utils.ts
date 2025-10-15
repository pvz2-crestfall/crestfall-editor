import { clsx, type ClassValue } from 'clsx';
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
        const moduleType = match[1];

        return {
            name: moduleName,
            type: moduleType as RTIDTypes,
        };
    } else {
        throw new Error('Invalid RTID Passed!');
    }
}

export enum RTIDTypes {
    level = 'CurrentLevel',
    module = 'LevelModules',
    zombie = 'ZombieTypes',
}
