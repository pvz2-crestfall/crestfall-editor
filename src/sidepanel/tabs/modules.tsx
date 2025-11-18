import { ChallengeModule } from './modules/challenges/challenges';
import { ConveyorLevelModule } from './modules/conveyor/conveyor';
import { GraveStonesModule } from './modules/gravestones/gravestones';

export function SidepanelModulesTab() {
    return (
        <div className="flex flex-col gap-2">
            <ConveyorLevelModule />
            <GraveStonesModule />
            <ChallengeModule />
        </div>
    );
}
