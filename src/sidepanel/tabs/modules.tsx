import { ChallengeModule } from './modules/challenges/challenges';
import { ConveyorLevelModule } from './modules/conveyor/conveyor';
import { GraveStonesModule } from './modules/gravestones/gravestones';
import { GridItemsModule } from './modules/griditems/griditems';
import { MinigameModule } from './modules/minigames/minigames';
import { PlantsModule } from './modules/plants/plants';
import { RailcartsModule } from './modules/railways/railway-editor';
import { PowertilesModule } from './modules/tiles/powertiles';

export function SidepanelModulesTab() {
    return (
        <div className="flex flex-col gap-2">
            <ConveyorLevelModule />
            <GridItemsModule />
            <GraveStonesModule />
            <PlantsModule />
            <RailcartsModule />
            <PowertilesModule />
            <MinigameModule />
            <ChallengeModule />
        </div>
    );
}
