import type { PVZObject } from '@/types/PVZTypes';
import { PVZBase } from '../base';
import type { ChallengeManager } from './challengemanager';

export interface StarChallengeKillZombiesInTimeProps {
    Time: number;
    ZombiesToKill: number;
}

export class ZombiesInTime extends PVZBase {
    static objclass: string = 'StarChallengeKillZombiesInTimeProps';
    aliases: string[] = ['KillInTime'];
    objdata: StarChallengeKillZombiesInTimeProps;

    constructor(data: PVZObject) {
        super();
        this.objdata = data.objdata as StarChallengeKillZombiesInTimeProps;
    }

    assign(challengeManager: ChallengeManager) {
        challengeManager.beatZombiesInTime = {
            time: this.objdata.Time,
            zombies: this.objdata.ZombiesToKill,
        };
    }

    static from(beatZombiesInTime: { time: number; zombies: number }) {
        return new this({
            objclass: '',
            objdata: {
                Time: beatZombiesInTime.time,
                ZombiesToKill: beatZombiesInTime.zombies,
            },
        });
    }
}
