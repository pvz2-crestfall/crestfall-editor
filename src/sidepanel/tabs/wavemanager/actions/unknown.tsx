import type { WaveAction } from '@/lib/levelModules/wavemanager/types';

export function UnknownAction({ waveaction }: { waveaction: WaveAction<any> }) {
    return (
        <div className="flex flex-col justify-centered">
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
