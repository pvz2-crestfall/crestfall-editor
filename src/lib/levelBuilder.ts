import {
    LawnMowerType,
    SeedBankSelectionMethod,
    StageModuleType,
    type ConveyorSeedBankPropertiesObject,
    type LevelDefinitionObject,
    type SeedBankObject,
} from '@/types/PVZTypes';
import { SunDropperType, type PVZObject } from '@/types/PVZTypes';
import { toRTID, RTIDTypes, fromRTID } from './utils';
import { SeedBank } from './levelModules/seedbank';
import { ConveyorBelt } from './levelModules/conveyor';
import { WaveManagerWrapper } from './levelModules/wavemanager';

export class LevelBuilder {
    private rawData: PVZObject[];
    private levelProperties: LevelDefinitionObject;
    private waveManager: WaveManagerWrapper;
    seedBank: SeedBank;
    conveyor: ConveyorBelt;
    lawnMower?: LawnMowerType;
    sunDropper?: SunDropperType = SunDropperType.Default;

    constructor(data: PVZObject[]) {
        // save the raw level data in case it's needed for something later
        this.rawData = data;

        // extract level metadata
        let levelDefObj = data.filter((obj) => obj.objclass == 'LevelDefinition')[0];
        if (!levelDefObj) levelDefObj = { objclass: 'LevelDefinition', objdata: {} } as PVZObject;

        const metadata = levelDefObj.objdata as LevelDefinitionObject;
        this.levelProperties = { ...metadata }; // clone the metadata object

        // fill in any missing fields
        this.levelProperties.Name = metadata['Name'] ?? '[EGYPT_LEVEL_NAME]';
        this.levelProperties.Description = metadata['Description'] ?? '[PLAYERS_TRIP_TO_EGYPT]';
        this.levelProperties.LevelNumber = metadata['LevelNumber'] ?? 1;
        this.levelProperties.Loot = metadata['Loot'] ?? 'RTID(DefaultLoot@LevelModules)';
        this.levelProperties.StageModule = metadata['StageModule'] ?? toRTID(StageModuleType.Egypt, RTIDTypes.module);
        this.levelProperties.NormalPresentTable = metadata['NormalPresentTable'] ?? 'egypt_normal_01';
        this.levelProperties.ShinyPresentTable = metadata['ShinyPresentTable'] ?? 'egypt_shiny_01';
        this.levelProperties.Modules = [];

        // check for misc properties in the level modules
        if (metadata.Modules) {
            metadata.Modules.forEach((module) => {
                const moduleRegex = /RTID\((.+)@(.+)\)/;
                const match = module.match(moduleRegex);

                if (match) {
                    const moduleName = match[1];

                    // check for lawn mowers
                    if (Object.values(LawnMowerType).includes(moduleName as LawnMowerType)) {
                        this.lawnMower = moduleName as LawnMowerType;
                    }

                    // check for sun dropper type
                    console.log(moduleName);
                    if (Object.values(SunDropperType).includes(moduleName as SunDropperType)) {
                        this.sunDropper = moduleName as SunDropperType;
                    }
                }

                console.log(match);
            });
        }

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
    }

    get stageType(): StageModuleType {
        const parsedRTID = fromRTID(this.levelProperties.StageModule);
        return parsedRTID.name as StageModuleType;
    }
    set stageType(stage: StageModuleType) {
        this.levelProperties.StageModule = toRTID(stage, RTIDTypes.level);
    }

    get startingSun(): number {
        return this.levelProperties.StartingSun ?? 50;
    }
    set startingSun(sun: number) {
        this.levelProperties.StartingSun = sun;
    }

    get allowBonusSun(): boolean {
        return this.levelProperties.AddBonusStartingSun ?? true;
    }
    set allowBonusSun(toggle: boolean) {
        this.levelProperties.AddBonusStartingSun = toggle;
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
            'RTID(ZombiesDeadWinCon@LevelModules)',
            'RTID(DefaultZombieWinCondition@LevelModules',
        ];

        if (this.seedBank.enabled) {
            const seedBankObj = this.seedBank.buildObject();
            modules.push(toRTID(this.seedBank.aliases[0], RTIDTypes.level));
            objects.push(seedBankObj);
        }
        if (this.conveyor && this.conveyor.enabled) {
            this.conveyor.objdata.ManualPacketSpawning = this.seedBank.enabled || undefined;
            const conveyorObj = this.conveyor.buildObject();
            modules.push(toRTID(this.conveyor.aliases[0], RTIDTypes.level));
            objects.push(conveyorObj);
        }

        if (this.sunDropper) modules.push(toRTID(this.sunDropper, RTIDTypes.module));
        if (this.lawnMower) modules.push(toRTID(this.lawnMower, RTIDTypes.module));

        modules.push(this.waveManager.getLevelModules());

        this.levelProperties.Modules = modules;
        objects.unshift({
            objclass: 'LevelDefinition',
            objdata: this.levelProperties,
        });
        for (const obj of this.waveManager.getlevelObjects()) {
            objects.push(obj);
        }

        return objects;
    }
}
