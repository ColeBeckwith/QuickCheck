import {AirportCheckpoint} from "./airport-checkpoint.interface";

export interface Airport {
    name: string;
    shortcode: string;
    city: string;
    state: string;
    utc: string;
    latitude: string;
    longitude: string;
    dst: string;
    precheck: string;
    checkpoints: Array<AirportCheckpoint>
}
