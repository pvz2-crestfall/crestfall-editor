import { ModuleTemplate } from '../template';
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

/*
    customMessage?: {
        description: string;
        name: string;
    };

    beatZombiesInTime?: {
        time: number;
        zombies: number;
    };

    targetScore?: {
        description: string;
        descriptionFailure: string;
        name: string;
        score: number;
    };
    endangeredPlants: { row: number; column: number; name: string }[] = [];
*/
export function ChallengeModule() {
    return (
        <ModuleTemplate title="Challenges / Restrictions" className="w-[80%] mx-auto">
            <MaxPlantsChallenge />
            <PlantsLostChallenge />
            <SunProductionChallenge />
            <MaxSunUsedChallenge />
            <TimeWithoutSpendingChallenge />
            <FlowerLineChallenge />

            <MoldChallenge />
            <EndangeredChallenge />
        </ModuleTemplate>
    );
}
