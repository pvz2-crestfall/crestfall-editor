import { TabSwitch } from '@/components/ui/tabswitcher';
import { ModuleTemplate } from '../template';
import { LastStandMinigame } from './last-stand';
import { CowboyMinigame } from './cowboy-minigame';

export function MinigameModule() {
    return (
        <ModuleTemplate title="Minigames Module">
            <TabSwitch tabs={[{ label: 'Last Stand', content: LastStandMinigame() }]} />
            <TabSwitch tabs={[{ label: 'Cowboy Minigame', content: CowboyMinigame() }]} />
        </ModuleTemplate>
    );
}
