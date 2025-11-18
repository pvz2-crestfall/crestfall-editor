import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Label } from '@/components/ui/label';

export function ModuleTemplate({
    children,
    title,
    className,
}: {
    children?: ReactNode;
    className?: string;
    title: string;
}) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Card className="py-1 h-full">
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full w-max-128">
                <CollapsibleTrigger asChild className="flex flex-row w-full items-center h-12">
                    <div className="flex items-center justify-center">
                        <Label className="text-md">{title}</Label>
                        <Button variant="ghost" size="icon">
                            <ChevronRight
                                className={cn(
                                    'transition-transform duration-200 ease-in-out',
                                    isOpen ? 'rotate-90' : '',
                                )}
                            />
                        </Button>
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="my-2">
                    <CardContent className={cn('flex flex-col justify-center items-center', className)}>
                        {children}
                    </CardContent>
                </CollapsibleContent>
            </Collapsible>
        </Card>
    );
}
