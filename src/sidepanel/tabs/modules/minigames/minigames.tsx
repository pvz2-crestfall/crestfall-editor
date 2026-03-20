import { TabSwitch } from '@/components/ui/tabswitcher';
import { ModuleTemplate } from '../template';
import { LastStandMinigame } from './last-stand';

export function MinigameModule() {
    return (
        <ModuleTemplate title="Minigames Module">
            <TabSwitch tabs={[{ label: 'Last Stand', content: LastStandMinigame() }]} />
        </ModuleTemplate>
    );
}
