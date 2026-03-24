import type { RailcartProperties } from '@/types/PVZTypes';
import { PVZBase } from './base';

export class Railcarts extends PVZBase {
    static objclass: string = 'RailcartProperties';
    aliases: string[] = ['Railcarts'];
    objdata: RailcartProperties;

    constructor(propertiesObject: RailcartProperties) {
        super();
        this.objdata = propertiesObject;
    }

    isEmpty(): boolean {
        return this.objdata.Railcarts.length == 0 && this.objdata.Rails.length == 0;
    }
}
