import { create } from 'zustand';

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
