import type { PVZObject } from '@/types/PVZTypes';
import { PVZBase } from '../base';
import type { ChallengeManager } from './challengemanager';

export interface StarChallengeBeatTheLevelProps {
    Description: string;
    DescriptiveName: string;
}

export class BeatTheLevel extends PVZBase {
    static objclass: string = 'StarChallengeBeatTheLevelProps';
    aliases: string[] = ['BeatTheLevelChallenge'];
    objdata: StarChallengeBeatTheLevelProps;

    constructor(data: PVZObject) {
        super();
        this.objdata = data.objdata as StarChallengeBeatTheLevelProps;
    }

    assign(challengeManager: ChallengeManager) {
        challengeManager.customMessage = {
            description: this.objdata.Description,
            name: this.objdata.DescriptiveName,
        };
    }

    static from(customMessage: { description: string; name: string }) {
        return new this({
            objclass: '',
            objdata: {
                Description: customMessage.description,
                DescriptiveName: customMessage.name,
            },
        });
    }
}
