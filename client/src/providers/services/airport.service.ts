import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AirportApi} from "../api/airport-api.service";
import {Airport} from "../../interfaces/airport.interface";
import {CheckpointWaitTime} from "../../interfaces/checkpoint-wait-time";

const waitTimeMapping = {
    '1': 'No Wait',
    '2': '1-10 Min',
    '3': '11-20 Min',
    '4': '21-30 Min',
    '5': '31-45 Min',
    '6': '46-60 Min',
    '7': '61-90 Min',
    '8': '91+ Min'
};

const degreesToRadians = Math.PI / 180;
const radiusOfEarthInMiles = 3959;

@Injectable()
export class AirportService {
    airports: Array<Airport> = null;
    selectedAirport: Airport = null;
    checkpointWaitTimes: Array<CheckpointWaitTime> = null;

    constructor(private airportApi: AirportApi) {
    }

    getAirports(): Promise<Array<Airport>> {
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

    getAirportByShortcode(shortcode): Promise<Array<CheckpointWaitTime>> {
        return new Promise((resolve, reject) => {
            this.airportApi.getAirportByShortcode(shortcode).subscribe((data) => {
                this.checkpointWaitTimes = data;
                resolve(this.checkpointWaitTimes);
            }, err => reject(err))
        })
    }

    selectAirport(airport: Airport) {
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
        console.log(this.selectedAirport.checkpoints);
    }

    coordinatesToMilesApart(firstCoords, secondCoords) {
        // Ever realize how much of a shit show navigation software is going to be once it has to scale to working on
        // multiple planets?
        let longDif = (secondCoords.longitude - firstCoords.longitude) * degreesToRadians;
        let latDif = (secondCoords.latitude - firstCoords.latitude) * degreesToRadians;
        let a = Math.sin(latDif/2) * Math.sin(latDif/2) + Math.cos(degreesToRadians * firstCoords.latitude) *
            Math.cos(degreesToRadians * secondCoords.latitude) * Math.sin(longDif/2) * Math.sin(longDif/2);
        return radiusOfEarthInMiles * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    }

    getNearbyAirports(airports, coordinates) {
        // TODO we can eventually implement Google Map's API to determine actual route distance as opposed to
        // 'as-the-crow-flies' distance.
        let nearbyAirports = [];
        airports.forEach((airport) => {
            let airportCoordinates = {
                latitude : parseFloat(airport.latitude),
                longitude : parseFloat(airport.longitude)
            };
            airport.milesFromUser = Math.round(this.coordinatesToMilesApart(airportCoordinates, coordinates));
            if (airport.milesFromUser < 30) {
                nearbyAirports.push(airport);
            }
        });

        if (nearbyAirports.length === 0) {
            airports.forEach((airport) => {
                if (airport.milesFromUser < 60) {
                    nearbyAirports.push(airport);
                }
            })
        }

        return nearbyAirports.sort((a, b) => a.milesFromUser - b.milesFromUser);
    }

}
