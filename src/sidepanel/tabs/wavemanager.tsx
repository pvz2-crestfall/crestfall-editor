import { TabSwitch } from '@/components/ui/tabswitcher';
import { WaveManagerSettings } from './wavemanager/settings';
import { WaveManagerWaves } from './wavemanager/waves';

export function WaveManagerTab() {
    return (
        <div className="flex flex-col gap-1">
            <TabSwitch
                tabs={[
                    { label: 'Settings', content: <WaveManagerSettings /> },
                    { label: 'Waves', content: <WaveManagerWaves /> },
                ]}
            />
        </div>
    );
}
