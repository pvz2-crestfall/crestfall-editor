import { PVZBase } from '../base';
import type { WaveManagerModulePropertiesObject, WaveManagerPropertiesObject } from '@/types/PVZTypes';
import type { PVZObject } from '@/types/PVZTypes';
import { fromRTID, RTIDTypes, toRTID } from '../../utils';
import type { WaveAction } from './types';

export class WaveManagerWrapper {
    waveManager: WaveManager;
    waveManagerModule: WaveManagerModule;
    waves: WaveAction[][] = [];

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
            this.waveManagerModule = new WaveManagerModule(
                waveManagerModuleObj.objdata as WaveManagerModulePropertiesObject,
            );
        } else {
            this.waveManagerModule = new WaveManagerModule({
                WaveManagerProps: toRTID(this.waveManager.aliases[0], RTIDTypes.current),
            });
        }

        const waves: WaveAction[][] = [];

        for (const wave of this.waveManager.objdata.Waves) {
            waves.push(
                wave
                    .map((waveAction) => {
                        const { name } = fromRTID(waveAction);

                        // attempt finding the wave action object
                        const match = data.filter((x) => x.aliases?.includes(name)).at(0);
                        if (match) {
                            return {
                                type: match.objclass,
                                data: match.objdata,
                                name,
                            };
                        }
                    })
                    .filter((x) => x !== undefined),
            );
        }

        this.waves = waves;
    }

    build(): [string[], PVZObject[]] {
        return [this.getLevelModules(), this.getlevelObjects()];
    }

    getLevelModules(): string[] {
        return [toRTID(this.waveManagerModule.aliases[0], RTIDTypes.current)];
    }

    getlevelObjects(): PVZObject[] {
        const waveManagerObj = this.waveManager.buildObject<WaveManagerPropertiesObject>();
        const waveManagerModuleObj = this.waveManagerModule.buildObject<WaveManagerModulePropertiesObject>();

        if (!this.waveCount || this.waveCount == 0) {
            waveManagerObj.objdata.WaveCount = waveManagerObj.objdata.Waves.length;
        }
        if (!this.flagInterval || this.flagInterval == 0) {
            waveManagerObj.objdata.FlagWaveInterval = waveManagerObj.objdata.WaveCount;
        }

        const waveObjects: PVZObject[] = [];
        const waveNames = this.waves.map((wave, waveIndex) => {
            return wave.map((action, actionIndex) => {
                const alias = 'Wave' + (waveIndex + 1).toString() + 'Action' + actionIndex.toString();

                const obj = { aliases: [alias], objclass: action.type, objdata: action.data } as PVZObject;
                waveObjects.push(obj);

                return toRTID(alias, RTIDTypes.current);
            });
        });

        waveManagerObj.objdata.Waves = waveNames;

        return [waveManagerObj, waveManagerModuleObj, ...waveObjects];
    }

    get waveCount(): number {
        return this.waveManager.objdata.WaveCount;
    }

    set waveCount(count: number) {
        this.waveManager.objdata.WaveCount = count;
    }

    get flagInterval(): number {
        return this.waveManager.objdata.FlagWaveInterval;
    }

    set flagInterval(interval: number) {
        this.waveManager.objdata.FlagWaveInterval = interval;
    }

    get minWaveHealth() {
        return this.waveManager.objdata.MinNextWaveHealthPercentage;
    }

    set minWaveHealth(val: number | undefined) {
        this.waveManager.objdata.MinNextWaveHealthPercentage = val;
    }

    get maxWaveHealth() {
        return this.waveManager.objdata.MaxNextWaveHealthPercentage;
    }

    set maxWaveHealth(val: number | undefined) {
        this.waveManager.objdata.MaxNextWaveHealthPercentage = val;
    }

    get firstWaveTime() {
        return this.waveManager.objdata.ZombieCountdownFirstWaveSecs;
    }

    set firstWaveTime(val: number | undefined) {
        this.waveManager.objdata.ZombieCountdownFirstWaveSecs = val;
    }
}

export class WaveManager extends PVZBase {
    aliases: string[] = ['WaveManagerProps'];
    objclass: string = 'WaveManagerProperties';
    objdata: WaveManagerPropertiesObject;

    constructor(propertiesObject: WaveManagerPropertiesObject) {
        super();
        this.objdata = propertiesObject;
    }
}

export class WaveManagerModule extends PVZBase {
    aliases: string[] = ['NewWaves'];
    objclass: string = 'WaveManagerModuleProperties';
    objdata: WaveManagerModulePropertiesObject;

    constructor(propertiesObject: WaveManagerModulePropertiesObject) {
        super();
        this.objdata = propertiesObject;
    }
}
