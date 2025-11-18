import type { SeedBankObject, SeedBankSelectionMethod } from '@/types/PVZTypes';
import { PVZBase } from './base';

export class SeedBank extends PVZBase {
    static objclass: string = 'SeedBankProperties';
    aliases: string[] = ['SeedBank'];
    objdata: SeedBankObject;
    enabled?: boolean = true;

    constructor(propertiesObject: SeedBankObject) {
        super();
        this.objdata = propertiesObject;
    }

    get selectionMethod() {
        return this.enabled ? this.objdata.SelectionMethod : undefined;
    }
    set selectionMethod(method: SeedBankSelectionMethod | undefined) {
        if (method) {
            this.enabled = true;
            this.objdata.SelectionMethod = method;
        } else {
            this.enabled = false;
        }
    }

    get presetPlants() {
        const plants = this.objdata.PresetPlantList ?? [];
        return plants.map((plant) => plant.PlantType);
    }
    set presetPlants(plants: string[]) {
        if (plants.length == 0) {
            this.objdata.PresetPlantList = undefined;
        } else {
            this.objdata.PresetPlantList = plants.map((plant) => {
                return { PlantType: plant, Level: -1 };
            });
        }
    }

    get excludeList() {
        return this.objdata.PlantExcludeList || [];
    }
    set excludeList(list: string[]) {
        this.objdata.PlantExcludeList = list.length == 0 ? undefined : list;
    }

    get excludeSunProducers() {
        return this.objdata.ExcludeListSunProducers ?? false;
    }

    set excludeSunProducers(val: boolean) {
        this.objdata.ExcludeListSunProducers = val ? val : undefined;
    }
}
