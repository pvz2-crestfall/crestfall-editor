import { levelState } from '@/lib/state';
import { animationDuration } from './waves';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BasicWaveAction } from './actions/basic-wave';
import type { SpawnZombiesJitteredWaveActionPropsObject, WaveAction } from '@/lib/levelModules/wavemanager/wavetypes';

export function WaveActionList({
    waveIndex,
    setIndex,
}: {
    waveIndex: number | null;
    setIndex: (index: number | null) => void;
}) {
    const { levelBuilder } = levelState();
    const wave = levelBuilder.waveManager.waves[waveIndex ?? -1];

    return (
        <div className="w-full flex-shrink-0">
            <div
                className={cn(
                    `flex flex-col ease-out transition-opacity duration-${animationDuration}`,
                    waveIndex != null ? 'opacity-100' : 'opacity-0',
                )}
            >
                {/*back button*/}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setIndex(null)}>
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                    <Label className="text-md">Wave {waveIndex !== null ? waveIndex + 1 : ''} Details</Label>
                </div>

                {/*content*/}
                <div className="flex flex-col items-center justify-between gap-2">
                    {wave &&
                        wave.map((action) => (
                            <div
                                key={action.type + waveIndex}
                                className="flex items-center rounded-md justify-center border shadow-sm p-2 w-full"
                            >
                                <RenderWaveAction waveaction={action} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

function RenderWaveAction<T = unknown>({ waveaction }: { waveaction: WaveAction<T> }) {
    switch (waveaction.type) {
        case 'SpawnZombiesJitteredWaveActionProps':
            return <BasicWaveAction waveaction={waveaction as WaveAction<SpawnZombiesJitteredWaveActionPropsObject>} />;
        default:
            // in case we get a wave action that's not implemented yet
            // which so far.. that's a lot of them
            return (
                <div className="flex flex-col justify-centered">
                    <p className="flex justify-center items-center">Unknown Action!</p>
                    <div className="flex flex-col gap-2">
                        {Object.entries(waveaction).map(([_, value]) => (
                            <div className="flex w-full items-center justify-center border rounded-md px-4 py-2 break-all">
                                {JSON.stringify(value)}
                            </div>
                        ))}
                    </div>
                </div>
            );
    }
}
