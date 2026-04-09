import {
    LawnMowerType,
    SunDropperType,
    type LevelDefinitionObject,
    type PVZObject,
    type SunDropperProperties,
} from '@/types/PVZTypes';
import { PVZBase } from './base';
import { fromRTID, RTIDTypes, toRTID } from '../utils';
import { SunDropper } from './sundropper';

export class LevelDefinition extends PVZBase {
    static objclass: string = 'LevelDefinition';
    aliases?: string[] = undefined;
    objdata: LevelDefinitionObject;
    rawModules: string[];

    lawnMower?: LawnMowerType | 'auto';
    sunDropperType?: SunDropperType;

    customSunDropper = new SunDropper({
        InitialSunDropDelay: 2,
        SunCountdownBase: 6,
        SunCountdownMax: 12,
        SunCountdownRange: 3,
        SunCountdownIncreasePerSun: 0.1,
    });

    constructor(data: PVZObject[]) {
        super();

        let metadata: LevelDefinitionObject;
        let definitionObject = data.find(({ objclass }) => objclass == 'LevelDefinition');
        if (!definitionObject) {
            alert('invalid level loaded!');
            metadata = {} as LevelDefinitionObject;
        } else {
            metadata = definitionObject.objdata as LevelDefinitionObject;
        }

        this.objdata = { ...metadata }; // clone the metadata object
        this.rawModules = metadata.Modules;
        this.objdata.Modules = [];

        // check for misc properties in the level modules
        if (metadata.Modules) {
            metadata.Modules.forEach((module) => {
                let { name, type } = fromRTID(module);

                if (type == RTIDTypes.current) {
                    let obj = data.find((obj) => obj.aliases?.includes(name));
                    if (obj?.objclass == 'SunDropperProperties') {
                        this.sunDropperType = SunDropperType.Custom;
                        this.customSunDropper.objdata = obj.objdata as SunDropperProperties;
                    }
                } else {
                    if (Object.values(LawnMowerType).includes(name as LawnMowerType)) {
                        this.lawnMower = name as LawnMowerType;
                    }

                    // check for sun dropper type
                    console.log(name);
                    if (Object.values(SunDropperType).includes(name as SunDropperType)) {
                        this.sunDropperType = name as SunDropperType;
                    }
                }
            });
        }
    }

    build(externalModuels?: string[]): [string[], PVZObject[]] {
        const modules = [...(externalModuels ?? [])];
        const objects = [];

        if (this.sunDropperType) {
            if (this.sunDropperType == SunDropperType.Custom) {
                let dropperObj = this.customSunDropper.buildObject();
                modules.push(toRTID(this.customSunDropper.aliases[0], RTIDTypes.current));
                objects.push(dropperObj);
            } else {
                modules.push(toRTID(this.sunDropperType, RTIDTypes.module));
            }
        }

        if (this.lawnMower) {
            const lawnMowerType = this.lawnMower == 'auto' ? worldMowers[this.stageType] : this.lawnMower;
            modules.push(toRTID(lawnMowerType, RTIDTypes.module));
        }

        const levelObject = this.buildObject<LevelDefinitionObject>();
        levelObject.objdata.Modules = modules;
        objects.unshift(levelObject);

        return [modules, objects];
    }

    getMowerType(): LawnMowerType | undefined {
        return this.lawnMower == 'auto' ? worldMowers[this.stageType] : this.lawnMower;
    }

    hasMoudle(obj: PVZObject): boolean {
        if (!obj.aliases || obj.aliases[0] == undefined) return false;

        let [objAlias] = obj.aliases;

        for (const m of this.rawModules) {
            let module = fromRTID(m);
            if (objAlias == module.name && module.type == RTIDTypes.current) return true;
        }

        return false;
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

    get levelMusic(): string {
        const musicType = this.objdata.MusicType;
        const loadDefaultMusic = this.objdata.LoadDefaultMusic;

        if (loadDefaultMusic && musicType == 'MiniGame_A') return 'zomboss';
        if (musicType == 'MiniGame_A') return 'minigame1';
        if (musicType == 'MiniGame_B') return 'minigame2';

        return 'default';
    }

    set levelMusic(music: string) {
        if (music == 'zomboss') {
            this.objdata.LoadDefaultMusic = true;
            this.objdata.MusicType = 'MiniGame_A';
        } else {
            this.objdata.LoadDefaultMusic = undefined;
        }

        if (music == 'minigame1') this.objdata.MusicType = 'MiniGame_A';
        if (music == 'minigame2') this.objdata.MusicType = 'MiniGame_B';
        if (music == 'default') {
            this.objdata.MusicType = undefined;
            this.objdata.LoadDefaultMusic = undefined;
        }
    }

    get powerupType(): PowerupSet {
        switch (this.objdata.LevelPowerupSet) {
            case 'LevelPowerupsDefault':
                return PowerupSet.Default;
            case 'LevelPowerupsUnlimited':
                return PowerupSet.Unlimited;
            case 'LevelPowerupsFlameThrower':
                return PowerupSet.Flamethrower;
            case 'LevelPowerupsVasebreaker':
                return PowerupSet.Vasebreaker;
            case 'LevelPowerupsBeghouled':
                return PowerupSet.Beghouled;
            case 'LevelPowerupsDisabled':
                return PowerupSet.Disabled;
            default:
                return PowerupSet.Default;
        }
    }

    set powerupType(type: PowerupSet) {
        this.objdata.LevelPowerupSet = type;
    }
}

export enum StageModuleType {
    Tutorial = 'TutorialStage',
    FrontLawn = 'FrontLawnStage',
    Egypt = 'EgyptStage',
    Pirate = 'PirateStage',
    WildWest = 'WestStage',
    Frostbite = 'IceageStage',
    LostCity = 'LostCityStage',
    Future = 'FutureStage',
    DarkAges = 'DarkStage',
    NMT = 'EightiesStage',
    Jurassic = 'DinoStage',
    BWB = 'BeachStage',
    Modern = 'ModernStage',
    BattleZ = 'JoustStage',
    Rift = 'RiftStage',
}

export enum PowerupSet {
    Default = 'LevelPowerupsDefault',
    Unlimited = 'LevelPowerupsUnlimited',
    Flamethrower = 'LevelPowerupsFlameThrower',
    Vasebreaker = 'LevelPowerupsVasebreaker',
    Beghouled = 'LevelPowerupsBeghouled',
    Disabled = 'LevelPowerupsDisabled',
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
