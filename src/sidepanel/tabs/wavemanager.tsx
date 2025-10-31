import { WaveManagerSettings } from './wavemanager/settings';
import { WaveManagerWaves } from './wavemanager/waves';

export function WaveManagerTab() {
    return (
        <div className="flex flex-col gap-1">
            <WaveManagerSettings />
            <WaveManagerWaves />
        </div>
    );
}
