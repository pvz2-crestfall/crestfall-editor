import type { GravestonePropertiesObject } from '@/types/PVZTypes';
import { PVZBase } from '../base';

export class GravestoneProperties extends PVZBase {
    static objclass: string = 'GravestoneProperties';
    aliases: string[] = ['Gravestones'];
    objdata: GravestonePropertiesObject;

    constructor(propertiesObject: GravestonePropertiesObject) {
        super();
        this.objdata = propertiesObject;
    }

    push(column: number, row: number, type?: string) {
        if (!this.objdata.ForceSpawnData) this.objdata.ForceSpawnData = [];

        this.objdata.ForceSpawnData.push({
            GridX: column,
            GridY: row,
            TypeName: type || undefined,
        });
    }

    get length(): number {
        return this.objdata.ForceSpawnData?.length || this.objdata.GravestoneCount || 0;
    }
}
