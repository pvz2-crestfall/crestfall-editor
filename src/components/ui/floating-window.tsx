import React, { useEffect, useState, useCallback, type CSSProperties } from 'react';
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

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

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
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 50,
                tolerance: 5,
            },
        }),
    );

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

    // Position clamping helper
    const getClampedPosition = useCallback(
        (pos: { x: number; y: number }) => {
            if (typeof window === 'undefined') return pos;
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const maxX = Math.max(0, vw - size.width);
            const maxY = Math.max(0, vh - size.height);

            return {
                x: clamp(pos.x, 0, maxX),
                y: clamp(pos.y, 0, maxY),
            };
        },
        [size.width, size.height],
    );

    // Initial state with position clamping
    const [position, setPosition] = useState(() => {
        let initialPos = defaultPosition;
        try {
            const stored = sessionStorage.getItem(`floatingWindow:${id}`);
            if (stored) initialPos = JSON.parse(stored);
        } catch {
            initialPos = defaultPosition;
        }
        return getClampedPosition(initialPos);
    });

    // Handle screen rotation / resize recalculations
    useEffect(() => {
        const handleResize = () => {
            setPosition((prev) => {
                const next = getClampedPosition(prev);
                sessionStorage.setItem(`floatingWindow:${id}`, JSON.stringify(next));
                return next;
            });
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }, [id, getClampedPosition]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { delta } = event;
        setPosition((prev: { x: number; y: number }) => {
            const next = getClampedPosition({
                x: prev.x + delta.x,
                y: prev.y + delta.y,
            });

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
            transition: transform ? 'none' : 'top 0.2s ease-out, left 0.2s ease-out, box-shadow 0.1s ease-in-out',
        };

        return (
            <div
                onPointerDown={handleFocus}
                ref={setNodeRef}
                style={style}
                className="rounded-lg border bg-background shadow-lg overflow-hidden flex flex-col min-w-0"
            >
                {/* Header with isolated drag handle */}
                <div className="flex items-center justify-between border-b bg-muted rounded-t-md shrink-0">
                    <div
                        {...listeners}
                        {...attributes}
                        className="flex-1 px-3 py-2 cursor-move select-none touch-none truncate"
                    >
                        <h4 className="text-sm font-semibold truncate">{title}</h4>
                    </div>

                    <div className="px-2 shrink-0" id="floating-window-close-button">
                        <button
                            id="floating-window-close-button"
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onFocusLost?.();
                                onClose?.();
                            }}
                            className="rounded p-1 hover:bg-muted-foreground/10"
                        >
                            <X size={16} id="floating-window-close-button" />
                        </button>
                    </div>
                </div>

                <div className="p-4 space-y-3 overflow-auto flex-1 min-w-0">{children}</div>
            </div>
        );
    }

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <DraggableContent position={position} />
        </DndContext>
    );
}
