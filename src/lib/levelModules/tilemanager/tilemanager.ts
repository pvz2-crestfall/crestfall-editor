import type { GravestonePropertiesObject, PVZObject } from '@/types/PVZTypes';
import { PVZBase } from '../base';
import { RTIDTypes, toRTID } from '@/lib/utils';

interface TileData {
    type: string;
    variant?: string;
}

const rows = 5;
const columns = 9;

const InitializeLayer = (): TileData[][] => new Array(rows).fill([]).map(() => new Array(columns));

export class TileManager {
    groundLayer: TileData[][] = InitializeLayer();
    obstacleLayer: TileData[][] = InitializeLayer();
    plantLayer: TileData[][] = InitializeLayer();

    constructor(data: PVZObject[]) {
        data.forEach((obj) => {
            if (obj.objclass === 'GravestoneProperties') {
                const graveData = obj.objdata as GravestonePropertiesObject;

                graveData.ForceSpawnData.forEach((tile) => {
                    const row = tile.GridY;
                    const col = tile.GridX;

                    this.obstacleLayer[row][col] = {
                        type: 'gravestone',
                        variant: tile.TypeName ?? 'default',
                    };
                });
            }
        });

        for (const row in this.obstacleLayer) {
            for (const col in this.obstacleLayer[row]) {
                if (!col) continue;
                console.log(row, col);
            }
        }
    }

    build(): [string[], PVZObject[]] {
        const modules: string[] = [];
        const objects: PVZObject[] = [];

        const obstacles = [];
        for (const rowIndex in this.obstacleLayer) {
            for (const colIndex in this.obstacleLayer[rowIndex]) {
                obstacles.push({ row: rowIndex, col: colIndex, data: this.obstacleLayer[rowIndex][colIndex] });
            }
        }

        // gravestones
        const gravestones = obstacles.filter((x) => x.data.type === 'gravestone');
        if (gravestones.length > 0) {
            const gravestoneObject = new GravestoneProperties({
                ForceSpawnData: gravestones.map((x) => ({
                    GridX: parseInt(x.col),
                    GridY: parseInt(x.row),
                    TypeName: x.data.variant == 'default' || x.data.variant == undefined ? undefined : x.data.variant,
                })),
            });
            const gravestonesModule = toRTID(gravestoneObject.aliases[0], RTIDTypes.current);
            modules.push(gravestonesModule);
            objects.push(gravestoneObject.buildObject());
        }

        return [modules, objects];
    }

    setTile(position: { row: number; col: number }, data: TileData) {
        const { row, col } = position;
        if (data.type == 'gravestone') this.obstacleLayer[row][col] = data;
        if (data.type == 'plant') this.plantLayer[row][col] = data;
        if (data.type == 'tile') this.groundLayer[row][col] = data;
    }

    removeTile(position: { row: number; col: number }, data: TileData) {
        const { row, col } = position;
        if (data.type == 'gravestone') delete this.obstacleLayer[row][col];
        if (data.type == 'plant') delete this.plantLayer[row][col];
        if (data.type == 'tile') delete this.groundLayer[row][col];
    }

    getAllAt(row: number, col: number): TileData[] {
        const tiles: TileData[] = [];

        const groundTile = this.groundLayer[row][col];
        if (groundTile) tiles.push(groundTile);

        const obstacleTile = this.obstacleLayer[row][col];
        if (obstacleTile) tiles.push(obstacleTile);

        const plantTile = this.plantLayer[row][col];
        if (plantTile) tiles.push(plantTile);

        return tiles;
    }
}

export class GravestoneProperties extends PVZBase {
    aliases: string[] = ['Gravestones'];
    objclass: string = 'GravestoneProperties';
    objdata: GravestonePropertiesObject;

    constructor(propertiesObject: GravestonePropertiesObject) {
        super();
        this.objdata = propertiesObject;
    }
}
