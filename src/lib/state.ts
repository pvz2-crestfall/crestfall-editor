import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { LevelBuilder } from './levelBuilder';
import { TileManager, type TileObject } from './levelModules/tilemanager/tilemanager';

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

type WindowManagerState = {
    activeId: string | null;
    order: string[]; // stack of window IDs
    setActive: (id: string) => void;
    register: (id: string) => void;
    unregister: (id: string) => void;
};

export const windowManagerState = create<WindowManagerState>((set, get) => ({
    activeId: null,
    order: [],
    setActive: (id) => {
        const { order } = get();
        const newOrder = [...order.filter((w) => w !== id), id]; // move to top
        set({ activeId: id, order: newOrder });
    },
    register: (id) => {
        const { order } = get();
        if (!order.includes(id)) {
            set({ order: [...order, id], activeId: id });
        }
    },
    unregister: (id) => {
        const { order, activeId } = get();
        const newOrder = order.filter((w) => w !== id);
        const nextActive = activeId === id ? (newOrder.at(-1) ?? null) : activeId;
        set({ order: newOrder, activeId: nextActive });
    },
}));
