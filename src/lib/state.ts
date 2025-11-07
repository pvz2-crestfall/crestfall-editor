import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { LevelBuilder } from './levelBuilder';

export interface LevelState {
    reload: number;
    levelBuilder: LevelBuilder;

    gridListener: ((row: number, column: number) => void) | undefined;
    setGridListener: (listener?: (row: number, column: number) => void) => void;
    triggerGridClick: (row: number, column: number) => void;

    reloadComponents: () => void;
    setBuilder: (builder: LevelBuilder) => void;
}

export const levelState = create<LevelState>()(
    immer((set, get) => ({
        reload: 0,
        levelBuilder: new LevelBuilder([]),

        gridListener: undefined,
        setGridListener: (listener?: (row: number, column: number) => void) => set({ gridListener: listener }),
        triggerGridClick: (r: number, c: number) => {
            const listener = get().gridListener;
            if (listener) listener(r, c);
        },

        reloadComponents: () =>
            set((state) => {
                state.reload += 1;
            }),
        setBuilder: (builder) => set({ levelBuilder: builder }),
    })),
);
