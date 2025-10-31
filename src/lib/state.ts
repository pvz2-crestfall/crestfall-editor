import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { LevelBuilder } from './levelBuilder';

export interface LevelState {
    reload: number;
    levelBuilder: LevelBuilder;
    reloadComponents: () => void;
    setBuilder: (builder: LevelBuilder) => void;
}

export const levelState = create<LevelState>()(
    immer((set) => ({
        reload: 0,
        levelBuilder: new LevelBuilder([]),
        reloadComponents: () =>
            set((state) => {
                state.reload += 1;
            }),
        setBuilder: (builder) => set({ levelBuilder: builder }),
    })),
);
