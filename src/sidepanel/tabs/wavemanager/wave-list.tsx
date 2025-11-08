import { levelState } from '@/lib/state';
import { animationDuration } from './waves';
import { ChevronsLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import type { WaveAction } from '@/lib/levelModules/wavemanager/wavetypes';
import { Label } from '@/components/ui/label';
import { Actions } from './actions/actions';

export function WaveList({
    waveIndex,
    setIndex,
}: {
    waveIndex: number | null;
    setIndex: (index: number | null) => void;
}) {
    const { levelBuilder } = levelState();
    const [waves, _setWaves] = useState(levelBuilder.waveManager.waves);
    const [removingIndex, setRemovingIndex] = useState<number | null>(null);

    const setWaves = (newWaves: WaveAction[][]) => {
        levelBuilder.waveManager.waves = newWaves;
        _setWaves(newWaves);
    };

    const addNewWave = () => {
        const defaultWaveType = 'SpawnZombiesJitteredWaveActionProps';
        const defaultWave: WaveAction[] = [
            {
                name: 'NewWave' + (waves.length + 1).toString(),
                type: defaultWaveType,
                data: structuredClone(Actions[defaultWaveType]?.defaultData ?? {}),
            },
        ];
        setWaves([...waves, defaultWave]);
    };

    const removeWave = (index: number) => {
        setRemovingIndex(index);
        setTimeout(() => {
            const newWaves = [...waves];
            newWaves.splice(index, 1);
            setWaves(newWaves);
            setRemovingIndex(null);
        }, 300); // match the CSS animation duration
    };

    return (
        <div
            className={cn(
                `w-full min-h-120 shrink-0 transition-opacity ease-out duration-${animationDuration}`,
                waveIndex == null ? 'opacity-100' : 'opacity-0',
            )}
        >
            <ul className="w-full">
                {waves.map((wave, index) => (
                    <li
                        key={index}
                        className={cn(
                            'flex items-center justify-between rounded-md border p-2',

                            removingIndex === index
                                ? 'transition-all duration-300 ease-out opacity-0 translate-x-4 scale-95 max-h-0 py-0 mb-0'
                                : 'opacity-100 max-h-20',
                        )}
                    >
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={() => setIndex(index)}>
                                <ChevronsLeft className="h-4 w-4" />
                            </Button>
                        </div>
                        <div>
                            <span>Wave {index + 1}</span>
                            <span> | </span>
                            <span>Actions {wave.length}</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeWave(index)}
                            className="text-muted-foreground hover:text-destructive hover:bg-red-100"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </li>
                ))}
                <li
                    key="+"
                    onClick={addNewWave}
                    className={cn(
                        'flex items-center justify-between rounded-md border p-2 shadow-sm ',
                        'hover:bg-primary/10 transition-colors duration-300',
                    )}
                >
                    <div className="w-full h-8 flex items-center justify-center gap-2">
                        <Label>New Wave</Label>
                    </div>
                </li>
            </ul>
        </div>
    );
}
