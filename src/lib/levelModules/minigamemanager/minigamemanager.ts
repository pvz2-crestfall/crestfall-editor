import type { PVZObject } from '@/types/PVZTypes';
import type { CowboyMinigameProperties, LastStandMinigameProperties } from './types';
import { RTIDTypes, toRTID } from '@/lib/utils';
import { LastStandMinigame } from './laststand';
import { CowboyMinigame } from './cowboyminigame';

export class MinigameManager {
    // lastStand: LastStandMinigameProperties = {
    //     StartingSun: 1000,
    //     StartingPlantfood: 0,
    // };
    // lastStandEnabled = false;

    lastStand: LastStandMinigame = new LastStandMinigame({ StartingSun: 1000, StartingPlantfood: 0 });
    cowboy: CowboyMinigame = new CowboyMinigame({ BeginString: '[COWBOY_MINIGAME_TUTORIAL_1]' });

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
        }
    }

    build(): [string[], PVZObject[]] {
        const modules: string[] = [];
        const objects: PVZObject[] = [];

        const modulesToBuild = [this.lastStand, this.cowboy];

        for (const mod of modulesToBuild) {
            if (mod.enabled) {
                modules.push(toRTID(mod.aliases[0], RTIDTypes.current));
                objects.push(mod.buildObject());
            }
        }

        return [modules, objects];
    }
}
