import type { SunDropperProperties } from '@/types/PVZTypes';
import { PVZBase } from './base';

export class SunDropper extends PVZBase {
    static objclass: string = 'SunDropperProperties';
    aliases: string[] = ['CustomSunDropper'];
    objdata: SunDropperProperties;

    constructor(data: SunDropperProperties) {
        super();
        this.objdata = data;
    }

    get sunDelay() {
        return this.objdata.InitialSunDropDelay;
    }
    get countdownBase() {
        return this.objdata.SunCountdownBase;
    }
    get countdownMax() {
        return this.objdata.SunCountdownMax;
    }
    get countdownRange() {
        return this.objdata.SunCountdownRange;
    }
    get countdownIncrement() {
        return this.objdata.SunCountdownIncreasePerSun;
    }
    set sunDelay(val: number) {
        this.objdata.InitialSunDropDelay = val;
    }
    set countdownBase(val: number) {
        this.objdata.SunCountdownBase = val;
    }
    set countdownMax(val: number) {
        this.objdata.SunCountdownMax = val;
    }
    set countdownRange(val: number) {
        this.objdata.SunCountdownRange = val;
    }
    set countdownIncrement(val: number) {
        this.objdata.SunCountdownIncreasePerSun = val;
    }
}
