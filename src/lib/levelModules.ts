import type {
    SeedBankObject,
    SeedBankSelectionMethod,
    WaveManagerModulePropertiesObject,
    WaveManagerPropertiesObject,
} from '@/types/PVZTypes';
import type { PVZObject } from '@/types/PVZTypes';

export class SeedBank implements PVZObject {
    enabled?: boolean = true;
    aliases: string[] = ['SeedBank'];
    objclass: string = 'SeedBankProperties';
    objdata: SeedBankObject;

    constructor(propertiesObject: SeedBankObject) {
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

    buildObject(): PVZObject {
        return this;
    }
}

export class WaveManager implements PVZObject {
    aliases: string[] = ['WaveManagerProps'];
    objclass: string = 'WaveManagerProperties';
    objdata: WaveManagerPropertiesObject;

    constructor(propertiesObject: WaveManagerPropertiesObject) {
        this.objdata = propertiesObject;
    }

    buildObject(): PVZObject {
        return this;
    }

    addWave(waveAlias: string) {
        const formatted = `RTID(${waveAlias}@CurrentLevel)`;
        this.waves.push([formatted]);
    }

    hasWave(waveAlias: string): boolean {
        const formatted = `RTID(${waveAlias}@CurrentLevel)`;
        for (const wave of this.waves) {
            if (wave.includes(formatted)) return true;
        }
        return false;
    }

    get waves() {
        return this.objdata.Waves;
    }
}

export class WaveManagerModule implements PVZObject {
    aliases: string[] = ['NewWaves'];
    objclass: string = 'WaveManagerModuleProperties';
    objdata: WaveManagerModulePropertiesObject;

    constructor(propertiesObject: WaveManagerModulePropertiesObject) {
        this.objdata = propertiesObject;
    }

    buildObject(): PVZObject {
        return this;
    }
}
