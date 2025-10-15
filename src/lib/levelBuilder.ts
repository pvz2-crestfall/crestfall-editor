import {
    LawnMowerType,
    SeedBankSelectionMethod,
    StageModuleType,
    type LevelDefinitionObject,
    type SeedBankObject,
} from '@/types/PVZTypes';
import type { PVZObject } from '@/types/PVZTypes';
import { SeedBank } from './levelModules';
import { WaveManagerWrapper } from './waveManager';
import { toRTID, RTIDTypes, fromRTID } from './utils';

export class LevelBuilder {
    private rawData: PVZObject[];
    private levelProperties: LevelDefinitionObject;
    private seedBank: SeedBank;
    private waveManager: WaveManagerWrapper;
    lawnMower?: LawnMowerType;

    constructor(data: PVZObject[]) {
        // save the raw level data in case it's needed for something later
        this.rawData = data;

        // extract level metadata
        let levelDefObj = data.filter((obj) => obj.objclass == 'LevelDefinition')[0];
        if (!levelDefObj) levelDefObj = { objclass: 'LevelDefinition', objdata: {} } as PVZObject;

        const metadata = levelDefObj.objdata as LevelDefinitionObject;
        this.levelProperties = metadata;

        this.levelProperties = {
            Name: metadata['Name'] ?? '[EGYPT_LEVEL_NAME]',
            Description: metadata['Description'] ?? '[PLAYERS_TRIP_TO_EGYPT]',
            LevelNumber: metadata['LevelNumber'] ?? 1,
            Loot: metadata['Loot'] ?? 'RTID(DefaultLoot@LevelModules)',
            Modules: [],
            StageModule: metadata['StageModule'] ?? toRTID(StageModuleType.Egypt, RTIDTypes.module),
            NormalPresentTable: metadata['NormalPresentTable'] ?? 'egypt_normal_01',
            ShinyPresentTable: metadata['ShinyPresentTable'] ?? 'egypt_shiny_01',
        };

        // check for lawn mower type
        if (metadata.Modules) {
            metadata.Modules.forEach((module) => {
                const moduleRegex = /RTID\((.+)@(.+)\)/;
                const match = module.match(moduleRegex);

                if (match) {
                    const moduleName = match[1];
                    if (Object.values(LawnMowerType).includes(moduleName as LawnMowerType)) {
                        this.lawnMower = moduleName as LawnMowerType;
                    }
                }

                console.log(match);
            });
        }

        // seed chooser properties
        const seedBankObj = data.filter((obj) => obj.objclass == 'SeedBankProperties')[0];
        if (seedBankObj) {
            const seedbank = seedBankObj.objdata as SeedBankObject;
            this.seedBank = new SeedBank(seedbank.SelectionMethod, seedbank.PresetPlantList);
        } else {
            this.seedBank = new SeedBank(SeedBankSelectionMethod.Chooser, []);
        }

        // initialize wave manager
        this.waveManager = new WaveManagerWrapper(data);
    }

    get stageType(): StageModuleType {
        const parsedRTID = fromRTID(this.levelProperties.StageModule);
        return parsedRTID.name as StageModuleType;
    }
    setStageType(stage: StageModuleType) {
        this.levelProperties.StageModule = toRTID(stage, RTIDTypes.level);
        return this;
    }
    set stageType(stage: StageModuleType) {
        this.levelProperties.StageModule = toRTID(stage, RTIDTypes.level);
    }

    get name(): string {
        return this.levelProperties['Name'];
    }
    set name(name: string) {
        this.levelProperties['Name'] = name;
    }

    get description(): string {
        return this.levelProperties['Description'];
    }
    set description(description: string) {
        this.levelProperties['Description'] = description;
    }

    get levelNumber(): number {
        return this.levelProperties['LevelNumber'];
    }
    set levelNumber(levelNumber: number) {
        this.levelProperties['LevelNumber'] = levelNumber;
    }

    build() {
        const objects: PVZObject[] = [];
        const modules = [
            'RTID(StandardIntro@LevelModules)',
            'RTID(DefaultSunDropper@LevelModules)',
            'RTID(ZombiesDeadWinCon@LevelModules)',
            'RTID(DefaultZombieWinCondition@LevelModules',
        ];
        const seedBankObj = this.seedBank.buildObject();
        modules.push(`RTID(${seedBankObj.aliases![0]}@CurrentLevel)`);
        if (this.lawnMower) modules.push(`RTID(${this.lawnMower}@LevelModules)`);

        modules.push(this.waveManager.getLevelModules());
        this.levelProperties.Modules = modules;

        objects.push({
            objclass: 'LevelDefinition',
            objdata: this.levelProperties,
        });
        objects.push(seedBankObj);

        for (const obj of this.waveManager.getlevelObjects()) {
            objects.push(obj);
        }

        return objects;
    }
}
