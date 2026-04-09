import type { PVZObject, SunBombChallengeProperties } from '@/types/PVZTypes';
import type { CowboyMinigameProperties, LastStandMinigameProperties } from './types';
import { RTIDTypes, toRTID } from '@/lib/utils';
import { LastStandMinigame } from './laststand';
import { CowboyMinigame } from './cowboyminigame';
import { SunBombsMinigame } from './sunbombs';

export class MinigameManager {
    // lastStand: LastStandMinigameProperties = {
    //     StartingSun: 1000,
    //     StartingPlantfood: 0,
    // };
    // lastStandEnabled = false;

    lastStand: LastStandMinigame = new LastStandMinigame({ StartingSun: 1000, StartingPlantfood: 0 });
    cowboy: CowboyMinigame = new CowboyMinigame({ BeginString: '[COWBOY_MINIGAME_TUTORIAL_1]' });
    sunbombs: SunBombsMinigame = new SunBombsMinigame({
        PlantDamage: 1000,
        PlantBombExplosionRadius: 25,
        ZombieDamage: 500,
        ZombieBombExplosionRadius: 80,
    });

    constructor(data: PVZObject[]) {
        for (const object of data) {
            if (object.objclass == 'LastStandMinigameProperties') {
                this.lastStand = new LastStandMinigame(object.objdata as LastStandMinigameProperties);
                this.lastStand.enabled = true;
            }

            if (object.objclass == 'CowboyMinigameProperties') {
                this.cowboy = new CowboyMinigame(object.objdata as CowboyMinigameProperties);
                this.cowboy.enabled = true;
            }

            if (object.objclass == 'SunBombChallengeProperties') {
                this.sunbombs = new SunBombsMinigame(object.objdata as SunBombChallengeProperties);
                this.sunbombs.enabled = true;
            }
        }
    }

    build(): [string[], PVZObject[]] {
        const modules: string[] = [];
        const objects: PVZObject[] = [];

        const modulesToBuild = [this.lastStand, this.cowboy, this.sunbombs];

        for (const mod of modulesToBuild) {
            if (mod.enabled) {
                modules.push(toRTID(mod.aliases[0], RTIDTypes.current));
                objects.push(mod.buildObject());
            }
        }

        return [modules, objects];
    }
}
