import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { LevelBuilder } from '../levelBuilder';
import { DefaultLevelFile } from '../fileManager';

export interface LevelState {
    levelBuilder: LevelBuilder;

    reloadLevelBuilder: () => void;
    setBuilder: (builder: LevelBuilder) => void;
}

const lastSession = sessionStorage.getItem('session-project');

export const levelState = create<LevelState>()(
    immer((set) => ({
        levelBuilder: new LevelBuilder(JSON.parse(lastSession ?? DefaultLevelFile).objects),
        reloadLevelBuilder: () =>
            set((state) => {
                state.levelBuilder = new LevelBuilder(state.levelBuilder.build());
            }),

        setBuilder: (builder) => set({ levelBuilder: builder }),
    })),
);
