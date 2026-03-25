import type { PVZObject, RailcartProperties } from '@/types/PVZTypes';
import { PVZBase } from './base';

export type RailwayObject = {
    rail: boolean;
    cart: boolean;
};
export class Railcarts extends PVZBase {
    static objclass: string = 'RailcartProperties';
    aliases: string[] = ['Railcarts'];
    objdata: RailcartProperties;

    railGrid: RailwayObject[][];

    constructor(propertiesObject: RailcartProperties) {
        super();
        this.objdata = propertiesObject;

        // map the objdata rails to our rail grid as tiles
        this.railGrid = Array.from({ length: 9 }, () =>
            Array.from({ length: 5 }, () => {
                return { rail: false, cart: false };
            }),
        );
        for (const rail of this.objdata.Rails) {
            for (let i = rail.RowStart; i <= rail.RowEnd; i++) {
                this.railGrid[rail.Column][i].rail = true;
            }
        }

        for (const { Column, Row } of this.objdata.Railcarts) {
            this.railGrid[Column][Row].cart = true;
        }
    }

    buildObject<T = unknown>(): PVZObject<T> {
        // convert our tile grid into the appropriate format
        const rails: RailcartProperties['Rails'] = [];
        const carts: RailcartProperties['Railcarts'] = [];

        // convert rails
        for (let col = 0; col < 9; col++) {
            let row = 0;

            while (row < 5) {
                if (this.railGrid[col][row].rail == false) {
                    // skip false tiles
                    row++;
                    continue;
                }

                // start of a rail segment
                const start = row;

                while (row < 5 && this.railGrid[col][row].rail) {
                    row++;
                }

                const end = row - 1;

                rails.push({
                    Column: col,
                    RowStart: start,
                    RowEnd: end,
                });
            }
        }

        // convert cart positions
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.railGrid[j][i].cart) {
                    carts.push({
                        Column: j,
                        Row: i,
                    });
                }
            }
        }

        this.objdata.Rails = rails;
        this.objdata.Railcarts = carts;

        const result: PVZObject = {
            aliases: this.aliases,
            objclass: this.objclass,
            objdata: this.objdata,
        };

        const copy: PVZObject<T> = Object.assign({}, result) as PVZObject<T>;

        return copy;
    }

    isEmpty(): boolean {
        return !this.railGrid.some((row) => row.some((cell) => cell.cart || cell.rail));
    }

    get railType(): string {
        return this.objdata.RailcartType;
    }

    set railType(type: string) {
        this.objdata.RailcartType = type;
    }
}
