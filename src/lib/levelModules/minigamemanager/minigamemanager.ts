import type { LastStandMinigameProperties, PVZObject } from '@/types/PVZTypes';
import { PVZBase } from '../base';
import { RTIDTypes, toRTID } from '@/lib/utils';

export class MinigameManager {
    lastStand: LastStandMinigameProperties = {
        StartingSun: 1000,
        StartingPlantfood: 0,
    };
    lastStandEnabled = false;

    constructor(data: PVZObject[]) {
        for (const object of data) {
            if (object.objclass == 'LastStandMinigameProperties') {
                this.lastStand = object.objdata as LastStandMinigameProperties;
            }
        }
    }

    build(): [string[], PVZObject[]] {
        const modules: string[] = [];
        const objects: PVZObject[] = [];

        if (this.lastStand && this.lastStandEnabled) {
            let lastStand = new LastStandMinigame(this.lastStand);
            modules.push(toRTID(lastStand.aliases[0], RTIDTypes.current));
            objects.push(lastStand.buildObject());
        }

        return [modules, objects];
    }
}

export class LastStandMinigame extends PVZBase {
    static objclass: string = 'LastStandMinigameProperties';
    aliases: string[] = ['LastStand'];
    objdata: LastStandMinigameProperties;

    constructor(propertiesObject: LastStandMinigameProperties) {
        super();
        this.objdata = propertiesObject;
    }
}
