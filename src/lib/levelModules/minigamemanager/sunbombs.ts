import type { SunBombChallengeProperties } from '@/types/PVZTypes';
import { PVZBase } from '../base';

export class SunBombsMinigame extends PVZBase {
    static objclass: string = 'SunBombChallengeProperties';
    aliases: string[] = ['SunBombs'];
    objdata: SunBombChallengeProperties;

    enabled = false;

    constructor(data: SunBombChallengeProperties) {
        super();
        this.objdata = data;
    }

    get plantDamage() {
        return this.objdata.PlantDamage;
    }
    get plantRadius() {
        return this.objdata.PlantBombExplosionRadius;
    }
    get zombieDamage() {
        return this.objdata.ZombieDamage;
    }
    get zombieRadius() {
        return this.objdata.ZombieBombExplosionRadius;
    }

    set plantDamage(val: number) {
        this.objdata.PlantDamage = val;
    }
    set plantRadius(val: number) {
        this.objdata.PlantBombExplosionRadius = val;
    }
    set zombieDamage(val: number) {
        this.objdata.ZombieDamage = val;
    }
    set zombieRadius(val: number) {
        this.objdata.ZombieBombExplosionRadius = val;
    }
}
