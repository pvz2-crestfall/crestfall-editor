import { ModuleTemplate } from '../template';
import { BeatTheLevelChallenge } from './custom-message';
import { EndangeredChallenge } from './endangered-challenge';
import { MoldChallenge } from './mold-challenge';
import {
    FlowerLineChallenge,
    MaxPlantsChallenge,
    MaxSunUsedChallenge,
    PlantsLostChallenge,
    SunProductionChallenge,
    TimeWithoutSpendingChallenge,
} from './simple-challenges';
import { BeatZombiesInTimeChallenge } from './zombies-in-time';

/*
    targetScore?: {
        description: string;
        descriptionFailure: string;
        name: string;
        score: number;
    };
*/
export function ChallengeModule() {
    return (
        <ModuleTemplate title="Challenges / Restrictions" className="w-[90%] mx-auto">
            <MaxPlantsChallenge />
            <PlantsLostChallenge />
            <SunProductionChallenge />
            <MaxSunUsedChallenge />
            <TimeWithoutSpendingChallenge />
            <FlowerLineChallenge />
            <BeatZombiesInTimeChallenge />
            <MoldChallenge />
            <EndangeredChallenge />
            <BeatTheLevelChallenge />
        </ModuleTemplate>
    );
}
