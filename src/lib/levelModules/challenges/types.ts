import type { BoardGridMapProps } from '@/types/PVZTypes';
import { PVZBase } from '../base';

// {
//     "aliases": ["Column0_To_Column0"],
//     "objclass": "BoardGridMapProps",
//     "objdata": {
//         "Values": [
//             [1, 0, 0, 0, 0, 0, 0, 0, 0],
//             [1, 0, 0, 0, 0, 0, 0, 0, 0],
//             [1, 0, 0, 0, 0, 0, 0, 0, 0],
//             [1, 0, 0, 0, 0, 0, 0, 0, 0],
//             [1, 0, 0, 0, 0, 0, 0, 0, 0]
//         ]
//     }
// },

export class GridMap extends PVZBase {
    aliases: string[] = ['GridMap'];
    static objclass: string = 'BoardGridMapProps';
    objdata: BoardGridMapProps;

    constructor(grid: number[][]) {
        super();
        this.objdata = { Values: grid };
    }
}
