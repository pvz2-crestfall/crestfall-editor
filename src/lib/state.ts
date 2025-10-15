import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { LevelBuilder } from './levelBuilder';
import type { StageModuleType } from '@/types/PVZTypes';

export interface LevelState {
    levelBuilder: LevelBuilder;
    setBuilder: (builder: LevelBuilder) => void;
    setStage: (stage: StageModuleType) => void;
}

export const levelState = create<LevelState>()(
    immer((set) => ({
        levelBuilder: new LevelBuilder([]),
        setBuilder: (builder) => set({ levelBuilder: builder }),
        setStage: (stage) =>
            set((state) => ({
                levelBuilder: Object.assign(Object.create(Object.getPrototypeOf(state.levelBuilder)), {
                    ...state.levelBuilder,
                    stageType: stage,
                }),
            })),
    }))
);
