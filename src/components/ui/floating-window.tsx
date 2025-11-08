import React, { useState, type CSSProperties } from 'react';
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

type FloatingWindowProps = {
    id: string; // unique ID for persistence
    title?: string;
    defaultPosition?: { x: number; y: number };
    size?: { width: number; height: number };
    onClose?: () => void;
    children?: React.ReactNode;
};

export function FloatingWindow({
    id,
    title = 'Window',
    defaultPosition = { x: 100, y: 100 },
    size = { width: 320, height: 240 },
    onClose,
    children,
}: FloatingWindowProps) {
    const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

    // Load last position from localStorage if exists
    const [position, setPosition] = useState(() => {
        try {
            const stored = localStorage.getItem(`floatingWindow:${id}`);
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
            localStorage.setItem(`floatingWindow:${id}`, JSON.stringify(next));
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
            zIndex: 9999,
        };

        return (
            <div ref={setNodeRef} style={style} className="rounded-lg border bg-background shadow-lg">
                {/* Header with isolated drag handle */}
                <div className="flex items-center justify-between border-b bg-muted rounded-t-md">
                    {/* Drag handle */}
                    <div {...listeners} {...attributes} className="flex-1 px-3 py-2 cursor-move select-none">
                        <h4 className="text-sm font-semibold">{title}</h4>
                    </div>

                    {/* Close button */}
                    <div className="px-2">
                        <button
                            type="button"
                            onClick={() => onClose?.()}
                            className="rounded p-1 hover:bg-muted-foreground/10"
                        >
                            <X size={16} />
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
