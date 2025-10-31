import { WaveManagerSettings } from './wavemanager/settings';

export function WaveManagerTab() {
    return (
        <div className="flex flex-col gap-1">
            <WaveManagerSettings />
        </div>
    );
}
