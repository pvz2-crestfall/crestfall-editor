import { PVZBase } from './base';
import type {
    WaveManagerModulePropertiesObject,
    WaveManagerPropertiesObject,
} from '@/types/PVZTypes';
import type { PVZObject } from '@/types/PVZTypes';
import { type SpawnZombiesJitteredWaveActionPropsObject as BasicWaveSpawner } from '@/types/PVZTypes';
import { fromRTID, RTIDTypes, toRTID } from '../utils';

export class WaveManagerWrapper {
    waveManager: WaveManager;
    waveManagerModule: WaveManagerModule;
    waveObjects: PVZObject[] = [];

    constructor(data: PVZObject[]) {
        const waveManagerObj = data.filter((obj) => obj.objclass == 'WaveManagerProperties')[0];
        if (waveManagerObj) {
            this.waveManager = new WaveManager(
                waveManagerObj.objdata as WaveManagerPropertiesObject,
            );
        } else {
            this.waveManager = new WaveManager({
                FlagWaveInterval: 0,
                WaveCount: 0,
                Waves: [],
            });
        }

        const waveManagerModuleObj = data.filter(
            (obj) => obj.objclass == 'WaveManagerModuleProperties',
        )[0];
        if (waveManagerModuleObj) {
            this.waveManagerModule = new WaveManagerModule(
                waveManagerModuleObj.objdata as WaveManagerModulePropertiesObject,
            );
        } else {
            this.waveManagerModule = new WaveManagerModule({
                WaveManagerProps: toRTID(this.waveManager.aliases[0], RTIDTypes.level),
            });
        }

        for (const wave of this.waveManager.waves) {
            for (const waveAction of wave) {
                const { name } = fromRTID(waveAction);

                // attempt finding the wave action object
                const match = data.filter((x) => x.aliases?.includes(name));
                if (match.length > 0) {
                    this.waveObjects.push(...match);
                }
            }
        }
    }

    getLevelModules(): string {
        return toRTID(this.waveManagerModule.aliases[0], RTIDTypes.level);
    }

    getlevelObjects(): PVZObject[] {
        const waveManagerObj = this.waveManager.buildObject<WaveManagerPropertiesObject>();
        const waveManagerModuleObj =
            this.waveManagerModule.buildObject<WaveManagerModulePropertiesObject>();

        if (!this.waveCount || this.waveCount == 0) {
            waveManagerObj.objdata.WaveCount = waveManagerObj.objdata.Waves.length;
        }
        if (!this.flagInterval || this.flagInterval == 0) {
            waveManagerObj.objdata.FlagWaveInterval = waveManagerObj.objdata.WaveCount;
        }

        return [waveManagerObj, waveManagerModuleObj, ...this.waveObjects];
    }

    get waves() {
        const waves = this.waveManager.objdata.Waves;
        return waves.map((wave) => wave.map((action) => fromRTID(action).name));
    }

    set waves(waves: string[][]) {
        this.waveManager.objdata.Waves = waves.map((wave) =>
            wave.map((action) => toRTID(action, RTIDTypes.level)),
        );
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

export class WaveManagerModule extends PVZBase {
    aliases: string[] = ['NewWaves'];
    objclass: string = 'WaveManagerModuleProperties';
    objdata: WaveManagerModulePropertiesObject;

    constructor(propertiesObject: WaveManagerModulePropertiesObject) {
        super();
        this.objdata = propertiesObject;
    }
}

export class BasicWave extends PVZBase {
    objclass: string = 'SpawnZombiesJitteredWaveActionProps';
    objdata: BasicWaveSpawner;

    constructor(propertiesObject: BasicWaveSpawner) {
        super();
        this.objdata = propertiesObject;
    }
}
