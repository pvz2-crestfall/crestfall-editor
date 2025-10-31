import type { ConveyorSeedBankPlantObject, ConveyorSeedBankPropertiesObject, PVZObject } from '@/types/PVZTypes';
import { PVZBase } from './base';

export class ConveyorBelt extends PVZBase {
    enabled?: boolean;
    aliases: string[] = ['ConveyorBelt'];
    objclass: string = 'ConveyorSeedBankProperties';
    objdata: ConveyorSeedBankPropertiesObject;
    powertiles: ConveyorSeedBankPlantObject[] = [];

    constructor(propertiesObject: ConveyorSeedBankPropertiesObject) {
        super();
        this.objdata = propertiesObject;

        if (!this.objdata.SpeedConditions || this.objdata.SpeedConditions.length == 0) {
            this.objdata.SpeedConditions = [{ MaxPackets: 0, Speed: 100 }];
        }
        if (!this.objdata.DropDelayConditions || this.objdata.DropDelayConditions.length == 0) {
            this.objdata.DropDelayConditions = [
                { Delay: 3, MaxPackets: 0 },
                { Delay: 6, MaxPackets: 2 },
                { Delay: 9, MaxPackets: 4 },
                { Delay: 12, MaxPackets: 8 },
            ];
        }

        // seperate powertiles from normal plants on loading
        const powerTilesIndexes: number[] = [];
        const powerTileNames = ['alpha', 'beta', 'gamma', 'delta'].map((x) => 'tool_powertile_' + x);
        for (const [index, item] of this.objdata.InitialPlantList.entries()) {
            if (powerTileNames.includes(item.PlantType)) powerTilesIndexes.push(index);
        }

        if (powerTilesIndexes.length > 0) {
            this.powertiles = this.objdata.InitialPlantList.filter((_, i) => powerTilesIndexes.includes(i));
            this.objdata.InitialPlantList = this.objdata.InitialPlantList.filter(
                (_, i) => !powerTilesIndexes.includes(i),
            );
        }
    }

    get speed(): number {
        const speeds = this.objdata.SpeedConditions;
        if (speeds[0]) return speeds[0].Speed;
        else return 100;
    }

    set speed(val: number) {
        this.objdata.SpeedConditions[0] = {
            MaxPackets: 0,
            Speed: val,
        };
    }

    get delayConditions() {
        return this.objdata.DropDelayConditions;
    }

    get plants() {
        return this.objdata.InitialPlantList;
    }

    set plants(plants: ConveyorSeedBankPlantObject[]) {
        this.objdata.InitialPlantList = plants;
    }

    get enablePowerTiles(): boolean {
        if (!this.objdata.ResourceGroupNames) return false;
        return this.objdata.ResourceGroupNames.includes('PowerTileModule');
    }

    set enablePowerTiles(val: boolean) {
        if (!val) {
            this.objdata.ResourceGroupNames = undefined;
        } else {
            if (!this.objdata.ResourceGroupNames) {
                this.objdata.ResourceGroupNames = [];
            }
            if (!this.objdata.ResourceGroupNames.includes('PowerTileModule')) {
                this.objdata.ResourceGroupNames.push('PowerTileModule');
            }
        }
    }

    buildObject(): PVZObject {
        const result = {
            aliases: this.aliases,
            objclass: this.objclass,
            objdata: Object.assign({}, this.objdata),
        };

        if (!this.powertiles || this.powertiles.length == 0) this.enablePowerTiles = false;

        if (this.powertiles && this.enablePowerTiles) {
            result.objdata.InitialPlantList = this.plants.concat(this.powertiles);
        }

        console.log(result);
        console.log(this.plants);
        console.log(this.powertiles);

        return result;
    }
}
