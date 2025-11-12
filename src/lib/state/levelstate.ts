import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { LevelBuilder } from '../levelBuilder';

export interface LevelState {
    backgroundReloads: number;
    levelBuilder: LevelBuilder;

    reloadBackground: () => void;
    reloadLevelBuilder: () => void;
    setBuilder: (builder: LevelBuilder) => void;
}

export const levelState = create<LevelState>()(
    immer((set) => ({
        backgroundReloads: 0,
        levelBuilder: new LevelBuilder([]),

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
