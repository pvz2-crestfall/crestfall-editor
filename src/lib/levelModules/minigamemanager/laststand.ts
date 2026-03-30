import type { LastStandMinigameProperties } from './types';
import { PVZBase } from '../base';

export class LastStandMinigame extends PVZBase {
    static objclass: string = 'LastStandMinigameProperties';
    aliases: string[] = ['LastStand'];
    objdata: LastStandMinigameProperties;

    enabled = false;

    constructor(propertiesObject: LastStandMinigameProperties) {
        super();
        this.objdata = propertiesObject;
    }

    get startingSun() {
        return this.objdata.StartingSun;
    }

    set startingSun(val: number) {
        this.objdata.StartingSun = val;
    }

    get startingPf() {
        return this.objdata.StartingPlantfood;
    }

    set startingPf(val: number) {
        this.objdata.StartingPlantfood = val;
    }
}
