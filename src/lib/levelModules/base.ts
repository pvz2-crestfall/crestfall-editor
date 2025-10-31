import type { PVZObject } from '@/types/PVZTypes';

export class PVZBase implements PVZObject {
    aliases?: string[];
    objclass: string = 'UndefinedClass';
    objdata: unknown;

    buildObject<T = unknown>(): PVZObject<T> {
        const result: PVZObject = {
            aliases: this.aliases,
            objclass: this.objclass,
            objdata: this.objdata,
        };

        const copy: PVZObject<T> = Object.assign({}, result) as PVZObject<T>;

        return copy;
    }
}
