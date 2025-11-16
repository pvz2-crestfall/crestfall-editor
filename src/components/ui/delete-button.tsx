import { Trash2 } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

export function DeleteButton({ onClick, className }: { onClick: () => void; className?: string }) {
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => onClick()}
            className={cn('text-muted-foreground hover:text-destructive hover:bg-red-100', className)}
        >
            <Trash2 className="h-4 w-4" />
        </Button>
    );
}
