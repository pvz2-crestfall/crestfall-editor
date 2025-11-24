import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { LevelBuilder } from '../levelBuilder';

export interface LevelState {
    levelBuilder: LevelBuilder;

    reloadLevelBuilder: () => void;
    setBuilder: (builder: LevelBuilder) => void;
}

export const levelState = create<LevelState>()(
    immer((set) => ({
        levelBuilder: new LevelBuilder([]),
        reloadLevelBuilder: () =>
            set((state) => {
                state.levelBuilder = new LevelBuilder(state.levelBuilder.build());
            }),

        setBuilder: (builder) => set({ levelBuilder: builder }),
    })),
);
