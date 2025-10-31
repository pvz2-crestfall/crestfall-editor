import { ConveyorLevelModule } from './modules/conveyor/conveyor';

export function SidepanelModulesTab() {
    return (
        <div className="flex flex-col gap-1">
            <ConveyorLevelModule />
        </div>
    );
}
