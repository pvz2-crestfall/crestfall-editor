import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface ComponentsState {
    previewToggles: Record<string, boolean>;
    setPreview: (key: string, value: boolean) => void;
}

export const componentState = create<ComponentsState>()(
    immer((set) => ({
        previewToggles: {} as Record<string, boolean>,
        setPreview: (key, value) =>
            set((state) => ({
                previewToggles: {
                    ...state.previewToggles,
                    [key]: value,
                },
            })),
    })),
);
