import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {Airport} from "../../interfaces/airport.interface";

@Injectable()
export class AirportApi {

    constructor(public http: Http) {
    }

    getAirports(): Observable<Array<Airport>> {
        return this.http.get('/api/airports')
            .map(data => data.json().airports.airport);
    }

    getAirportByShortcode(shortcode: string) {
        return this.http.get('/api/airports/shortcode/' + shortcode)
            .map(data => data.json());
    }
}
