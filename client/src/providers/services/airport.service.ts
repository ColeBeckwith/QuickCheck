import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AirportApi} from "../api/airport-api.service";
import {Airport} from "../../interfaces/airport.interface";


@Injectable()
export class AirportService {
    airports : Array<Airport> = null;
    selectedAirport : Airport = null;

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

    getAirportByShortcode(shortcode) {
        return new Promise((resolve, reject) => {
            this.airportApi.getAirportByShortcode(shortcode).subscribe((data) => {
                console.log(data);
            })
        })
    }

    selectAirport(airport : Airport) {
        this.selectedAirport = airport;
    }

}
