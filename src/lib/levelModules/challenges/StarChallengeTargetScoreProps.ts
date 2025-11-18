import type { PVZObject } from '@/types/PVZTypes';
import { PVZBase } from '../base';
import type { ChallengeManager } from './challengemanager';

export interface StarChallengeTargetScoreProps {
    Description: string;
    DescriptionFailure: string;
    DescriptiveName: string;
    TargetScore: number;
}

export class TargetScore extends PVZBase {
    static aliases: string[] = ['TargetScore'];
    static objclass: string = 'StarChallengeTargetScoreProps';
    objdata: StarChallengeTargetScoreProps;

    constructor(data: PVZObject) {
        super();
        this.objdata = data.objdata as StarChallengeTargetScoreProps;
    }

    assign(challengeManager: ChallengeManager) {
        challengeManager.targetScore = {
            description: this.objdata.Description,
            descriptionFailure: this.objdata.DescriptionFailure,
            name: this.objdata.DescriptiveName,
            score: this.objdata.TargetScore,
        };
    }

    static from(targetScore: { description: string; descriptionFailure: string; name: string; score: number }) {
        return new this({
            objclass: '',
            objdata: {
                Description: targetScore.description,
                DescriptionFailure: targetScore.descriptionFailure,
                DescriptiveName: targetScore.name,
                TargetScore: targetScore.score,
            },
        });
    }
}
