import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { LevelBuilder } from './levelBuilder';
import type { TileManager } from './levelModules/tilemanager/tilemanager';

export interface LevelState {
    backgroundReloads: number;
    levelBuilder: LevelBuilder;
    gridListener: ((row: number, column: number) => void) | undefined;
    gridData: TileManager | undefined;

    setGridData: (data: TileManager | undefined) => void;
    setGridListener: (listener?: (row: number, column: number) => void) => void;
    triggerGridClick: (row: number, column: number) => void;
    reloadBackground: () => void;
    reloadLevelBuilder: () => void;
    setBuilder: (builder: LevelBuilder) => void;
}

export const levelState = create<LevelState>()(
    immer((set, get) => ({
        backgroundReloads: 0,
        levelBuilder: new LevelBuilder([]),
        gridListener: undefined,
        gridData: undefined,

        setGridData: (gridData: TileManager | undefined) => set({ gridData }),
        setGridListener: (listener?: (row: number, column: number) => void) => set({ gridListener: listener }),
        triggerGridClick: (r: number, c: number) => {
            const listener = get().gridListener;
            if (listener) listener(r, c);
        },

        reloadBackground: () =>
            set((state) => {
                state.backgroundReloads += 1;
            }),
        reloadLevelBuilder: () =>
            set((state) => {
                state.levelBuilder = new LevelBuilder(state.levelBuilder.build());
            }),

        setBuilder: (builder) => set({ levelBuilder: builder }),
    })),
);
