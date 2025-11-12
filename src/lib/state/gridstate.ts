import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { TileObject, TileManager } from '../levelModules/tilemanager/tilemanager';

interface GridListener {
    id: string;
    onClick?: ((row: number, column: number) => void) | undefined;
}

export interface GridState {
    shouldUpdate: boolean;
    gridListeners: GridListener[];
    rawTiles: TileObject[] | undefined;
    gridData: TileManager | undefined;
    defaultGrid: TileManager | undefined;

    setGridData: (data: TileManager | undefined) => void;
    setDefaultGrid: (data: TileManager | undefined) => void;

    addGridListener(listener: GridListener): void;
    removeGridListener(listener: GridListener): void;
    removeGridListener(listener: string): void;

    triggerGridClick(row: number, column: number): void;
    updateGrid(): void;
}

export const gridState = create<GridState>()(
    immer((set, get) => ({
        shouldUpdate: false,
        gridListeners: [],
        rawTiles: [],
        gridData: undefined,
        defaultGrid: undefined,

        setGridData: (gridData: TileManager | undefined) => set({ gridData }),
        setDefaultGrid: (defaultGrid: TileManager | undefined) => set({ defaultGrid }),

        addGridListener(listener: GridListener) {
            set((state) => {
                const index = state.gridListeners.findIndex((l) => l.id === listener.id);
                if (index != -1) {
                    // Replace existing listener
                    state.gridListeners[index] = listener;
                } else {
                    // Add new listener
                    state.gridListeners.push(listener);
                }
            });
        },
        removeGridListener(listener: GridListener | string) {
            set((state) => {
                if (typeof listener === 'string') {
                    state.gridListeners = state.gridListeners.filter((l) => l.id !== listener);
                } else {
                    state.gridListeners = state.gridListeners.filter((l) => l.id !== listener.id);
                }
            });
        },

        triggerGridClick: (r: number, c: number) => {
            for (const listener of get().gridListeners) {
                listener.onClick?.(r, c);
            }
        },
        updateGrid: () => {
            set((state) => {
                state.shouldUpdate = !state.shouldUpdate;
            });
        },
    })),
);
