import type {
    SeedBankObject,
    SeedBankSelectionMethod,
    WaveManagerModulePropertiesObject,
    WaveManagerPropertiesObject,
} from '@/types/PVZTypes';
import type { PVZObject } from '@/types/PVZTypes';

export class SeedBank implements PVZObject {
    aliases: string[] = ['SeedBank'];
    objclass: string = 'SeedBankProperties';
    objdata: SeedBankObject;
    constructor(selectionMethod: SeedBankSelectionMethod, presetPlantList?: string[]) {
        this.objdata = {
            SelectionMethod: selectionMethod,
            PresetPlantList: presetPlantList,
        };
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
