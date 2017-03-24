import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

interface Coordinates {
    latitude : number;
    longitude : number;
}

@Injectable()
export class UserInfoService {
    coordinates : Coordinates;
    coordinatesCache : Promise<Coordinates> = null;

    constructor() {
    }

    getUserCoordinates() {
        if (!this.coordinatesCache) {
            this.coordinatesCache = new Promise((resolve, reject) => {
               navigator.geolocation.getCurrentPosition((pos : any) => {
                   this.coordinates = {
                       latitude : pos.coords.latitude,
                       longitude : pos.coords.longitude
                   };
                   resolve(this.coordinates);
               })
            })
        }
        return this.coordinatesCache;
    }

}
