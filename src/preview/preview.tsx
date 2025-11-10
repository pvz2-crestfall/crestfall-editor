import { AspectRatio } from '@/components/ui/aspect-ratio';
import { LevelGrid } from './grid';
import { LevelBackground } from './background';
import { SunCounter } from './sun';

export function LevelPreview() {
    return (
        <AspectRatio ratio={4 / 3} className="select-none">
            <LevelBackground />
            <SunCounter />
            <LevelGrid />
        </AspectRatio>
    );
}
