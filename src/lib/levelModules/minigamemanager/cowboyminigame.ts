import type { CowboyMinigameProperties } from './types';
import { PVZBase } from '../base';

export class CowboyMinigame extends PVZBase {
    static objclass: string = 'CowboyMinigameProperties';
    aliases: string[] = ['CowboyMinigame'];
    objdata: CowboyMinigameProperties;

    enabled = false;

    constructor(propertiesObject: CowboyMinigameProperties) {
        super();
        this.objdata = propertiesObject;
    }

    get startString() {
        return this.objdata.BeginString;
    }

    set startString(val: string) {
        this.objdata.BeginString = val;
    }

    get isTutorial() {
        return this.objdata.ShowTutorial ?? false;
    }

    set isTutorial(val: boolean) {
        this.objdata.ShowTutorial = val ? val : undefined;
    }
}
