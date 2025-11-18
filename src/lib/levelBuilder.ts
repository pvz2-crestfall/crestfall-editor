import type { ConveyorSeedBankPropertiesObject, LevelDefinitionObject, SeedBankObject } from '@/types/PVZTypes';
import type { PVZObject } from '@/types/PVZTypes';
import { SeedBankSelectionMethod } from '@/types/PVZTypes';
import { toRTID, RTIDTypes } from './utils';
import { SeedBank } from './levelModules/seedbank';
import { ConveyorBelt } from './levelModules/conveyor';
import { WaveManagerWrapper } from './levelModules/wavemanager/wavemanager';
import { TileManager } from './levelModules/tilemanager/tilemanager';
import { LevelDefinition } from './levelModules/leveldefinition';
import { ChallengeManager } from './levelModules/challenges/challengemanager';

export class LevelBuilder {
    rawData: PVZObject[];
    levelProperties: LevelDefinition;
    waveManager: WaveManagerWrapper;
    tileManager: TileManager;
    challengeManager: ChallengeManager;
    seedBank: SeedBank;
    conveyor: ConveyorBelt;

    constructor(data: PVZObject[]) {
        // save the raw level data in case it's needed for something later
        this.rawData = data;

        // extract level metadata
        let levelDefObj = data.filter((obj) => obj.objclass == 'LevelDefinition')[0];
        if (!levelDefObj) levelDefObj = { objclass: 'LevelDefinition', objdata: {} } as PVZObject;
        this.levelProperties = new LevelDefinition(levelDefObj.objdata as LevelDefinitionObject);

        // seed chooser properties
        const seedBankObj = data.filter((obj) => obj.objclass == 'SeedBankProperties')[0];
        if (seedBankObj) {
            const seedbank = seedBankObj.objdata as SeedBankObject;
            this.seedBank = new SeedBank(seedbank);
        } else {
            this.seedBank = new SeedBank({ SelectionMethod: SeedBankSelectionMethod.Chooser });
        }

        // conveyor properties
        const conveyorObj = data.filter((obj) => obj.objclass == 'ConveyorSeedBankProperties')[0];
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

        // initialize wave manager
        this.waveManager = new WaveManagerWrapper(data);
        this.tileManager = new TileManager(data);

        // challenge manager
        this.challengeManager = new ChallengeManager(data);
    }

    build() {
        const objects: PVZObject[] = [];
        const modules = [
            'RTID(StandardIntro@LevelModules)',
            'RTID(ZombiesDeadWinCon@LevelModules)',
            'RTID(DefaultZombieWinCondition@LevelModules)',
        ];

        if (this.seedBank.enabled) {
            const seedBankObj = this.seedBank.buildObject();
            modules.push(toRTID(this.seedBank.aliases[0], RTIDTypes.current));
            objects.push(seedBankObj);
        }
        if (this.conveyor && this.conveyor.enabled) {
            this.conveyor.objdata.ManualPacketSpawning = this.seedBank.enabled || undefined;
            const conveyorObj = this.conveyor.buildObject();
            modules.push(toRTID(this.conveyor.aliases[0], RTIDTypes.current));
            objects.push(conveyorObj);
        }

        const [challengeModules, challengeObjects] = this.challengeManager.build();
        modules.push(...challengeModules);
        objects.push(...challengeObjects);

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
