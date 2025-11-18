import { ModuleTemplate } from '../template';
import { MoldEditor } from './mold-challenge';
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

    moldLocations: { row: number; column: number }[] = [];
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

            <MoldEditor></MoldEditor>
        </ModuleTemplate>
    );
}
