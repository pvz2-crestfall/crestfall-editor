import type { PVZObject } from '@/types/PVZTypes';

export class PVZBase implements PVZObject {
    static objclass = 'UndefinedClass';
    aliases?: string[];
    objdata: unknown;

    get objclass() {
        return (this.constructor as typeof PVZBase).objclass;
    }

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
