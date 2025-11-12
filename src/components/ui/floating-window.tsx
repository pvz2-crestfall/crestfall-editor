import React, { useEffect, useState, type CSSProperties } from 'react';
import {
    DndContext,
    useDraggable,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core';
import { X } from 'lucide-react';
import { windowManagerState } from '@/lib/state/windowmanagerstate';

type FloatingWindowProps = {
    id: string; // unique ID for persistence
    title?: string;
    defaultPosition?: { x: number; y: number };
    size?: { width: number; height: number };
    onClose?: () => void;
    onFocus?: () => void;
    onFocusLost?: () => void;
    children?: React.ReactNode;
};

export function FloatingWindow({
    id,
    title = 'Window',
    defaultPosition = { x: 100, y: 100 },
    size = { width: 320, height: 240 },
    onClose,
    onFocus,
    onFocusLost,
    children,
}: FloatingWindowProps) {
    const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

    const { activeId, order, setActive, register, unregister } = windowManagerState();
    const isFocused = activeId === id;
    const zIndex = 9999 + order.indexOf(id);

    useEffect(() => {
        register(id);
        return () => unregister(id);
    }, [id, register, unregister]);

    const handleFocus = () => {
        if (!isFocused) {
            setActive(id);
            console.log('Gained focus in', id);
        }
    };

    const [wasFocused, setWasFocused] = useState(isFocused);
    useEffect(() => {
        if (isFocused && !wasFocused) {
            onFocus?.();
        } else if (!isFocused && wasFocused) {
            onFocusLost?.();
        }
        setWasFocused(isFocused);
    }, [isFocused, wasFocused, onFocus, onFocusLost]);

    // Load last position from localStorage if exists
    const [position, setPosition] = useState(() => {
        try {
            const stored = sessionStorage.getItem(`floatingWindow:${id}`);
            return stored ? JSON.parse(stored) : defaultPosition;
        } catch {
            return defaultPosition;
        }
    });

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

    const handleDragEnd = (event: DragEndEvent) => {
        const { delta } = event;
        setPosition((prev: { x: number; y: number }) => {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const maxX = vw - size.width;
            const maxY = vh - size.height;

            const next = {
                x: clamp(prev.x + delta.x, 0, Math.max(0, maxX)),
                y: clamp(prev.y + delta.y, 0, Math.max(0, maxY)),
            };

            // Save to localStorage
            sessionStorage.setItem(`floatingWindow:${id}`, JSON.stringify(next));
            return next;
        });
    };

    function DraggableContent({ position }: { position: { x: number; y: number } }) {
        const { attributes, listeners, setNodeRef, transform } = useDraggable({
            id: `floating-window-${id}`,
        });

        const style: CSSProperties = {
            position: 'fixed',
            top: position.y + (transform?.y ?? 0),
            left: position.x + (transform?.x ?? 0),
            width: size.width,
            height: size.height,
            zIndex,
            boxShadow: isFocused
                ? '0 0 12px rgba(0, 0, 0, 0.8), 0 0 0 2px var(--accent)'
                : '0 0 8px rgba(0, 0, 0, 0.2)',
            transition: 'box-shadow 0.1s ease-in-out',
        };

        return (
            <div
                onMouseDown={handleFocus}
                onMouseUp={handleFocus}
                ref={setNodeRef}
                style={style}
                className="rounded-lg border bg-background shadow-lg"
            >
                {/* Header with isolated drag handle */}
                <div className="flex items-center justify-between border-b bg-muted rounded-t-md">
                    {/* Drag handle */}
                    <div {...listeners} {...attributes} className="flex-1 px-3 py-2 cursor-move select-none">
                        <h4 className="text-sm font-semibold">{title}</h4>
                    </div>

                    {/* Close button */}
                    <div className="px-2" id="floating-window-close-button">
                        <button
                            id="floating-window-close-button"
                            type="button"
                            onClick={() => {
                                onFocusLost?.();
                                onClose?.();
                            }}
                            className="rounded p-1 hover:bg-muted-foreground/10"
                        >
                            <X size={16} id="floating-window-close-button" />
                        </button>
                    </div>
                </div>

                <div className="p-4 space-y-3 overflow-auto h-[calc(100%-2.5rem)]">{children}</div>
            </div>
        );
    }

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <DraggableContent position={position} />
        </DndContext>
    );
}
