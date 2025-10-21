import { AspectRatio } from '@/components/ui/aspect-ratio';
import { LevelGrid } from './grid';
import { LevelBackground } from './background';
import { SunCounter } from './sun';

export function LevelPreview() {
    return (
        <AspectRatio ratio={4 / 3}>
            <div className="relative w-full h-full inset-0 rounded-md select-none">
                <LevelBackground />
                <SunCounter />
                <LevelGrid />
            </div>
        </AspectRatio>
    );
}
