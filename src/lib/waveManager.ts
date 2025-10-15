import type { WaveManagerModulePropertiesObject, WaveManagerPropertiesObject } from '@/types/PVZTypes';
import type { PVZObject } from '@/types/PVZTypes';
import { WaveManager, WaveManagerModule } from './levelModules';
import { type SpawnZombiesJitteredWaveActionPropsObject as BasicWaveSpawner } from '@/types/PVZTypes';
import { toRTID, RTIDTypes } from './utils';

export class WaveManagerWrapper {
    waveManager: WaveManager;
    waveManagerModule: WaveManagerModule;
    waveObjects: BasicWave[] = [];

    constructor(data: PVZObject[]) {
        const waveManagerObj = data.filter((obj) => obj.objclass == 'WaveManagerProperties')[0];
        if (waveManagerObj) {
            this.waveManager = new WaveManager(waveManagerObj.objdata as WaveManagerPropertiesObject);
        } else {
            this.waveManager = new WaveManager({
                FlagWaveInterval: 0,
                WaveCount: 0,
                Waves: [],
            });
        }

        const waveManagerModuleObj = data.filter((obj) => obj.objclass == 'WaveManagerModuleProperties')[0];
        if (waveManagerModuleObj) {
            this.waveManagerModule = new WaveManagerModule(waveManagerModuleObj.objdata as WaveManagerModulePropertiesObject);
        } else {
            const formatted = `RTID(${this.waveManager.aliases[0]}@CurrentLevel)`;
            this.waveManagerModule = new WaveManagerModule({ WaveManagerProps: formatted });
        }

        const basicWaves = data.filter((obj) => obj.objclass == 'SpawnZombiesJitteredWaveActionProps');
        for (const wave of basicWaves) {
            const waveObj = wave as BasicWave;
            this.waveObjects.push(waveObj);
        }

        for (const wave of this.waveObjects) {
            let alias;
            if (wave.aliases && wave.aliases.length > 0) {
                alias = wave.aliases[0];
            }

            if (alias && !this.waveManager.hasWave(alias)) {
                this.waveManager.addWave(alias);
            }
        }

        this.waveManager.objdata.WaveCount = this.waveManager.waves.length;
    }

    getLevelModules(): string {
        return toRTID(this.waveManagerModule.aliases[0], RTIDTypes.level);
    }

    getlevelObjects(): PVZObject[] {
        return [this.waveManager, this.waveManagerModule, ...this.waveObjects];
    }
}

export class BasicWave implements PVZObject {
    aliases?: string[];
    objclass: string = 'SpawnZombiesJitteredWaveActionProps';
    objdata: BasicWaveSpawner;

    constructor(propertiesObject: BasicWaveSpawner) {
        this.objdata = propertiesObject;
    }

    buildObject(): PVZObject {
        return this;
    }
}
