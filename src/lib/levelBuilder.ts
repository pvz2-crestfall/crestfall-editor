import type {
    ConveyorSeedBankPropertiesObject,
    LevelDefinitionObject,
    PiratePlankProperties,
    SeedBankObject,
} from '@/types/PVZTypes';
import type { PVZObject } from '@/types/PVZTypes';
import { SeedBankSelectionMethod, StageModuleType } from '@/types/PVZTypes';
import { toRTID, RTIDTypes } from './utils';
import { SeedBank } from './levelModules/seedbank';
import { ConveyorBelt } from './levelModules/conveyor';
import { WaveManagerWrapper } from './levelModules/wavemanager/wavemanager';
import { TileManager } from './levelModules/tilemanager/tilemanager';
import { LevelDefinition } from './levelModules/leveldefinition';
import { ChallengeManager } from './levelModules/challenges/challengemanager';
import { MinigameManager } from './levelModules/minigamemanager/minigamemanager';
import { PiratePlanks } from './levelModules/pirateplanks';

export class LevelBuilder {
    rawData: PVZObject[];
    levelProperties: LevelDefinition;
    waveManager: WaveManagerWrapper;
    tileManager: TileManager;
    challengeManager: ChallengeManager;
    minigameManager: MinigameManager;
    seedBank: SeedBank;
    conveyor: ConveyorBelt;

    /* world properties */

    piratePlanks?: PiratePlanks;

    constructor(data: PVZObject[]) {
        // save the raw level data in case it's needed for something later
        this.rawData = data;

        // extract level metadata
        let levelDefObj = data.find((obj) => obj.objclass == 'LevelDefinition');
        if (!levelDefObj) levelDefObj = { objclass: 'LevelDefinition', objdata: {} } as PVZObject;
        this.levelProperties = new LevelDefinition(levelDefObj.objdata as LevelDefinitionObject);

        // seed chooser properties
        const seedBankObj = data.find((obj) => obj.objclass == 'SeedBankProperties');
        if (seedBankObj) {
            const seedbank = seedBankObj.objdata as SeedBankObject;
            this.seedBank = new SeedBank(seedbank);
            this.seedBank.enabled = true;
        } else {
            this.seedBank = new SeedBank({ SelectionMethod: SeedBankSelectionMethod.Chooser });
        }

        // conveyor properties
        const conveyorObj = data.find((obj) => obj.objclass == 'ConveyorSeedBankProperties');
        if (conveyorObj) {
            const seedbank = conveyorObj.objdata as ConveyorSeedBankPropertiesObject;
            this.conveyor = new ConveyorBelt(seedbank);
            this.conveyor.enabled = true;
        } else {
            this.conveyor = new ConveyorBelt({
                DropDelayConditions: [],
                SpeedConditions: [],
                InitialPlantList: [],
            });
        }

        // pirate planks
        const piratePlanksObj = data.find((obj) => obj.objclass == 'PiratePlankProperties');
        if (piratePlanksObj) {
            console.log('Pirate planks found');
            const planks = piratePlanksObj.objdata as PiratePlankProperties;
            this.piratePlanks = new PiratePlanks(planks);

            if (this.levelProperties.hasMoudle(piratePlanksObj)) {
                this.piratePlanks.enabled = true;
                console.log('Pirate planks enabled');
            }
        }

        // initialize module managers
        this.waveManager = new WaveManagerWrapper(data);
        this.tileManager = new TileManager(data);
        this.challengeManager = new ChallengeManager(data);
        this.minigameManager = new MinigameManager(data);
    }

    build() {
        const objects: PVZObject[] = [];
        const modules = [
            'RTID(StandardIntro@LevelModules)',
            'RTID(ZombiesDeadWinCon@LevelModules)',
            'RTID(DefaultZombieWinCondition@LevelModules)',
        ];

        // only build pirate planks if it's a pirate stage, otherwise the game crashes
        if (this.piratePlanks?.enabled && this.levelProperties.stageType == StageModuleType.Pirate) {
            const planksObj = this.piratePlanks.buildObject();
            modules.push(toRTID(this.piratePlanks.aliases[0], RTIDTypes.current));
            objects.push(planksObj);
        }
        if (this.seedBank.enabled) {
            const seedBankObj = this.seedBank.buildObject();
            modules.push(toRTID(this.seedBank.aliases[0], RTIDTypes.current));
            objects.push(seedBankObj);
        }
        if (this.conveyor?.enabled) {
            this.conveyor.objdata.ManualPacketSpawning = this.seedBank.enabled || undefined;
            const conveyorObj = this.conveyor.buildObject();
            modules.push(toRTID(this.conveyor.aliases[0], RTIDTypes.current));
            objects.push(conveyorObj);
        }

        const [challengeModules, challengeObjects] = this.challengeManager.build();
        modules.push(...challengeModules);
        objects.push(...challengeObjects);

        const [minigameModules, minigameObjects] = this.minigameManager.build();
        modules.push(...minigameModules);
        objects.push(...minigameObjects);

        const [tileModules, tileObjects] = this.tileManager.build();
        modules.push(...tileModules);
        objects.push(...tileObjects);

        const [waveModules, waveObjects] = this.waveManager.build();
        modules.push(...waveModules);
        objects.push(...waveObjects);

        const [_levelModules, [levelObject]] = this.levelProperties.build(modules);
        objects.unshift(levelObject);

        return objects;
    }
}
