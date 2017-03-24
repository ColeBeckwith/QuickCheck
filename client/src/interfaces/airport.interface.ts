import {AirportCheckpoint} from "./airport-checkpoint.interface";

export interface Airport {
    name: string;
    shortcode: string;
    city: string;
    state: string;
    utc: string;
    latitude: number;
    longitude: number;
    dst: boolean;
    precheck: boolean;
    checkpoints: Array<AirportCheckpoint>;
    milesFromUser: number;
}
