import {
    LawnMowerType,
    StageModuleType,
    SunDropperType,
    type LevelDefinitionObject,
    type PVZObject,
} from '@/types/PVZTypes';
import { PVZBase } from './base';
import { fromRTID, RTIDTypes, toRTID } from '../utils';

export class LevelDefinition extends PVZBase {
    static objclass: string = 'LevelDefinition';
    aliases?: string[] = undefined;
    objdata: LevelDefinitionObject;

    lawnMower?: LawnMowerType | 'auto';
    sunDropper?: SunDropperType = SunDropperType.Default;

    constructor(metadata: LevelDefinitionObject) {
        super();

        this.objdata = { ...metadata }; // clone the metadata object
        this.objdata.Name = metadata['Name'] ?? '[EGYPT_LEVEL_NAME]';
        this.objdata.Description = metadata['Description'] ?? '[PLAYERS_TRIP_TO_EGYPT]';
        this.objdata.LevelNumber = metadata['LevelNumber'] ?? 1;
        this.objdata.Loot = metadata['Loot'] ?? 'RTID(DefaultLoot@LevelModules)';
        this.objdata.StageModule = metadata['StageModule'] ?? toRTID(StageModuleType.Egypt, RTIDTypes.module);
        this.objdata.NormalPresentTable = metadata['NormalPresentTable'] ?? 'egypt_normal_01';
        this.objdata.ShinyPresentTable = metadata['ShinyPresentTable'] ?? 'egypt_shiny_01';
        this.objdata.Modules = [];

        if (!this.objdata.StartingSun) this.objdata.StartingSun = 50;
        if (!this.objdata.AddBonusStartingSun) this.objdata.AddBonusStartingSun = true;

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
            });
        }
    }

    build(externalModuels?: string[]): [string[], PVZObject[]] {
        const modules = [...(externalModuels ?? []), ...this.getLevelModules()];
        const object = this.buildObject<LevelDefinitionObject>();

        object.objdata.Modules = modules;

        return [modules, [object]];
    }

    getLevelModules(): string[] {
        const modules = [];

        if (this.sunDropper) modules.push(toRTID(this.sunDropper, RTIDTypes.module));
        if (this.lawnMower) {
            const lawnMowerType = this.lawnMower == 'auto' ? worldMowers[this.stageType] : this.lawnMower;
            modules.push(toRTID(lawnMowerType, RTIDTypes.module));
        }

        return modules;
    }

    get stageType(): StageModuleType {
        const parsedRTID = fromRTID(this.objdata.StageModule);
        return parsedRTID.name as StageModuleType;
    }
    set stageType(stage: StageModuleType) {
        this.objdata.StageModule = toRTID(stage, RTIDTypes.module);
    }

    get startingSun(): number {
        return this.objdata.StartingSun ?? 50;
    }
    set startingSun(sun: number) {
        this.objdata.StartingSun = sun;
    }

    get allowBonusSun(): boolean {
        return this.objdata.AddBonusStartingSun ?? true;
    }
    set allowBonusSun(toggle: boolean) {
        this.objdata.AddBonusStartingSun = toggle;
    }

    get name(): string {
        return this.objdata.Name;
    }
    set name(name: string) {
        this.objdata.Name = name;
    }

    get description(): string {
        return this.objdata.Description;
    }
    set description(description: string) {
        this.objdata.Description = description;
    }

    get levelNumber(): number {
        return this.objdata.LevelNumber;
    }
    set levelNumber(levelNumber: number) {
        this.objdata.LevelNumber = levelNumber;
    }
}

const worldMowers = {
    [StageModuleType.Tutorial]: LawnMowerType.Tutorial,
    [StageModuleType.FrontLawn]: LawnMowerType.Tutorial,
    [StageModuleType.Egypt]: LawnMowerType.Egypt,
    [StageModuleType.Pirate]: LawnMowerType.Pirate,
    [StageModuleType.WildWest]: LawnMowerType.WildWest,
    [StageModuleType.Frostbite]: LawnMowerType.Frostbite,
    [StageModuleType.LostCity]: LawnMowerType.LostCity,
    [StageModuleType.Future]: LawnMowerType.Future,
    [StageModuleType.DarkAges]: LawnMowerType.DarkAges,
    [StageModuleType.NMT]: LawnMowerType.NMT,
    [StageModuleType.Jurassic]: LawnMowerType.Jurassic,
    [StageModuleType.BWB]: LawnMowerType.BWB,
    [StageModuleType.Modern]: LawnMowerType.Modern,
    [StageModuleType.BattleZ]: LawnMowerType.BattleZ,
    [StageModuleType.Rift]: LawnMowerType.Modern,
};
