import { ModuleTemplate } from '../template';
import { InitialPlantPlacements } from './initial-plants';

export function PlantsModule() {
    return (
        <ModuleTemplate title="Plants Module">
            <InitialPlantPlacements />
        </ModuleTemplate>
    );
}
