import { TabSwitch } from '@/components/ui/tabswitcher';
import { ModuleTemplate } from '../template';
import { LastStandMinigame } from './last-stand';
import { CowboyMinigame } from './cowboy-minigame';
import { SunBombsChallenge } from './sunbombs';

export function MinigameModule() {
    return (
        <ModuleTemplate title="Minigame Modules">
            <TabSwitch
                tabs={[
                    { label: 'Last Stand', content: <LastStandMinigame /> },
                    { label: 'Cowboy', content: <CowboyMinigame /> },
                    { label: 'Sunbombs', content: <SunBombsChallenge /> },
                ]}
            />
        </ModuleTemplate>
    );
}
