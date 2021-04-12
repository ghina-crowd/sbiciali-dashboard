import {UnitModel} from "./unit.model";

export interface DurationModel {
    _id: string;
    type: string;
    unit: UnitModel;
    costCounter: string;
}