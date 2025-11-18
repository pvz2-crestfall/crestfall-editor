import { fromRTID, RTIDTypes, toRTID } from '@/lib/utils';
import { PVZBase } from '../base';
import type { LevelDefinitionObject, StarChallengeModulePropertiesObj } from '@/types/PVZTypes';
import type { PVZObject } from '@/types/PVZTypes';
import { LevelDefinition } from '../leveldefinition';
import { SunProduced } from './StarChallengeSunProducedProps';
import { BeatTheLevel } from './StarChallengeBeatTheLevelProps';
import { MaxSunUsed } from './StarChallengeSunUsedProps';
import { SimultaneousPlants } from './StarChallengeSimultaneousPlantsProps';
import { ZombiesInTime } from './StarChallengeKillZombiesInTimeProps';
import { PlantsLost } from './StarChallengePlantsLostProps';
import { ZombieDistance } from './StarChallengeZombieDistanceProps';
import { TargetScore } from './StarChallengeTargetScoreProps';
import { SunHoldout } from './StarChallengeSpendSunHoldoutProps';
import { MoldColony } from './MoldColonyChallengeProps';
import { EndangeredPlants } from './ProtectThePlantChallengeProperties';
import { GridMap } from './types';

const challengeClasses = {
    StarChallengeBeatTheLevelProps: BeatTheLevel,
    StarChallengeKillZombiesInTimeProps: ZombiesInTime,
    StarChallengeSunProducedProps: SunProduced,
    StarChallengeSimultaneousPlantsProps: SimultaneousPlants,
    StarChallengeSunUsedProps: MaxSunUsed,
    StarChallengePlantsLostProps: PlantsLost,
    StarChallengeZombieDistanceProps: ZombieDistance,
    StarChallengeTargetScoreProps: TargetScore,
    StarChallengeSpendSunHoldoutProps: SunHoldout,
    MoldColonyChallengeProps: MoldColony,
    ProtectThePlantChallengeProperties: EndangeredPlants,
};

export class ChallengeManager extends PVZBase {
    aliases: string[] = ['ChallengeModule'];
    objclass: string = 'StarChallengeModuleProperties';
    objdata: StarChallengeModulePropertiesObj;

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

    plantsLost?: number;
    maxPlants?: number;
    sunProduced?: number;
    maxSunUsed?: number;
    timeWithoutSpending?: number;
    zombieDistance?: number;

    moldLocations: { row: number; column: number }[] = [];
    endangeredPlants: { row: number; column: number; name: string }[] = [];

    constructor(data: PVZObject[]) {
        super();

        const moduleObj = data.filter((obj) => obj.objclass == this.objclass)[0];
        if (moduleObj != undefined) {
            this.objdata = moduleObj.objdata as StarChallengeModulePropertiesObj;
            this.objdata.ChallengesAlwaysAvailable = true;
        } else {
            this.objdata = {
                Challenges: [],
                ChallengesAlwaysAvailable: true,
            };
        }

        let modules: string[] = [];
        const levDef = data.filter((obj) => obj.objclass == LevelDefinition.objclass)[0];
        if (levDef) {
            const additionalModules = (levDef.objdata as LevelDefinitionObject).Modules;
            modules.push(...additionalModules);
        }

        const challengeObjects = [];
        for (const challenge of this.objdata.Challenges.flat()) {
            const { name } = fromRTID(challenge);
            const obj = data.filter((o) => o.aliases?.includes(name))[0];
            if (obj != undefined) challengeObjects.push(obj);
        }
        for (const module of modules) {
            const { name } = fromRTID(module);
            const obj = data.filter((o) => o.aliases?.includes(name))[0];
            if (obj != undefined) challengeObjects.push(obj);
        }

        // read the challenge objects
        for (let challenge of challengeObjects) {
            const challengeKey = challenge.objclass as keyof typeof challengeClasses;
            if (!challengeClasses[challengeKey]) continue;

            const challengeClass = new challengeClasses[challengeKey](challenge);
            challengeClass.assign(this);
        }
    }

    build(): [string[], PVZObject[]] {
        const modules = this.getLevelModules();
        const objects = this.getlevelObjects();

        if (objects.length == 0) return [[], []];

        return [modules, objects];
    }

    getLevelModules(): string[] {
        return [toRTID(this.aliases[0], RTIDTypes.current)];
    }

    getlevelObjects(): PVZObject[] {
        const objects: PVZObject[] = [];

        if (this.customMessage) {
            objects.push(BeatTheLevel.from(this.customMessage).buildObject());
        }
        if (this.beatZombiesInTime) {
            objects.push(ZombiesInTime.from(this.beatZombiesInTime).buildObject());
        }
        if (this.targetScore) {
            objects.push(TargetScore.from(this.targetScore).buildObject());
        }
        if (this.plantsLost) {
            objects.push(PlantsLost.from(this.plantsLost).buildObject());
        }
        if (this.maxPlants) {
            objects.push(SimultaneousPlants.from(this.maxPlants).buildObject());
        }
        if (this.sunProduced) {
            objects.push(SunProduced.from(this.sunProduced).buildObject());
        }
        if (this.maxSunUsed) {
            objects.push(MaxSunUsed.from(this.maxSunUsed).buildObject());
        }
        if (this.timeWithoutSpending) {
            objects.push(SunHoldout.from(this.timeWithoutSpending).buildObject());
        }
        if (this.zombieDistance) {
            objects.push(ZombieDistance.from(this.zombieDistance).buildObject());
        }
        if (this.endangeredPlants.length > 0) {
            objects.push(EndangeredPlants.from(this.endangeredPlants).buildObject());
        }
        if (this.moldLocations.length > 0) {
            const grid = new Array(5).map(() => new Array(9).fill(0));
            for (const location of this.moldLocations) {
                const { row, column } = location;
                grid[row][column] = 1;
            }

            const gridObject = new GridMap(grid);
            gridObject.aliases[0] = 'MoldGridMap';
            const moldObject = MoldColony.from(gridObject);

            objects.push(gridObject, moldObject);
        }

        const names = objects.map((x) => (x.aliases ? x.aliases[0] : '')).map((x) => toRTID(x, RTIDTypes.current));
        if (names.length > 0) {
            const moduleObject: PVZObject<StarChallengeModulePropertiesObj> = {
                aliases: this.aliases,
                objclass: this.objclass,
                objdata: {
                    Challenges: [names],
                    ChallengesAlwaysAvailable: true,
                },
            };

            objects.unshift(moduleObject);
        }

        return objects;
    }
}
