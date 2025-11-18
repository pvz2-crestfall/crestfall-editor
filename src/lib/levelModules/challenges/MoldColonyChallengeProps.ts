import type { PVZObject } from '@/types/PVZTypes';
import { PVZBase } from '../base';
import type { ChallengeManager } from './challengemanager';
import type { GridMap } from './types';
import { RTIDTypes, toRTID } from '@/lib/utils';

export interface MoldColonyChallengeProps {
    Locations: string;
}

export class MoldColony extends PVZBase {
    static aliases: string[] = ['MoldColony'];
    static objclass: string = 'MoldColonyChallengeProps';
    objdata: MoldColonyChallengeProps;

    constructor(data: PVZObject) {
        super();
        this.objdata = data.objdata as MoldColonyChallengeProps;
    }

    // unfortunately mold locations are saved in a seperate file in the game, so loading them from here isn't feasable
    assign(_challengeManager: ChallengeManager) {}

    static from(grid: GridMap) {
        return new this({
            objclass: '',
            objdata: {
                Locations: toRTID(grid.aliases[0], RTIDTypes.current),
            },
        });
    }
}
