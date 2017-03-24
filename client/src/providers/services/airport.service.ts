import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AirportApi} from "../api/airport-api.service";
import {Airport} from "../../interfaces/airport.interface";
import {CheckpointWaitTime} from "../../interfaces/checkpoint-wait-time";

const waitTimeMapping = {
    '1' : 'No Wait',
    '2' : '1-10 Min',
    '3' : '11-20 Min',
    '4' : '21-30 Min',
    '5' : '31-45 Min',
    '6' : '46-60 Min',
    '7' : '61-90 Min',
    '8' : '91+ Min'
};

@Injectable()
export class AirportService {
    airports : Array<Airport> = null;
    selectedAirport : Airport = null;
    checkpointWaitTimes : Array<CheckpointWaitTime> = null;

    constructor(private airportApi: AirportApi) {
    }

    getAirports() : Promise<Array<Airport>> {
        return new Promise((resolve, reject) => {
            if (this.airports) {
                resolve(this.airports);
            } else {
                this.airportApi.getAirports().subscribe((data) => {
                    this.airports = data;
                    resolve(this.airports);
                }, (error) => reject(error))
            }
        })
    }

    getAirportByShortcode(shortcode) : Promise<Array<CheckpointWaitTime>> {
        return new Promise((resolve, reject) => {
            this.airportApi.getAirportByShortcode(shortcode).subscribe((data) => {
                this.checkpointWaitTimes = data;
                resolve(this.checkpointWaitTimes);
            })
        })
    }

    selectAirport(airport : Airport) {
        this.selectedAirport = airport;
    }

    getMostRecentCheckpointTimes() {
        this.selectedAirport.checkpoints.forEach((checkpoint) => {
            let waitTimeFound = false;
            this.checkpointWaitTimes.forEach((waitTime) => {
                if (!waitTimeFound && waitTime.CheckpointIndex === checkpoint.id) {
                    checkpoint.waitTime = waitTimeMapping[waitTime.WaitTime];
                    waitTimeFound = true;
                }
            })
        });
    }

}
