import type { PVZObject } from '@/types/PVZTypes';

export class PVZBase implements PVZObject {
    aliases?: string[];
    objclass: string = 'UndefinedClass';
    objdata: unknown;

    buildObject(): PVZObject {
        return {
            aliases: this.aliases,
            objclass: this.objclass,
            objdata: this.objdata,
        };
    }
}
