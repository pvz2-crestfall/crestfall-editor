import { ChallengeModule } from './modules/challenges/challenges';
import { ConveyorLevelModule } from './modules/conveyor/conveyor';
import { GraveStonesModule } from './modules/gravestones/gravestones';
import { MinigameModule } from './modules/minigames/minigames';
import { RailcartsModule } from './modules/railways/railway-editor';

export function SidepanelModulesTab() {
    return (
        <div className="flex flex-col gap-2">
            <ConveyorLevelModule />
            <RailcartsModule />
            <GraveStonesModule />
            <MinigameModule />
            <ChallengeModule />
        </div>
    );
}
