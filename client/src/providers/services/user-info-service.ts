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
               // navigator.geolocation
            })
        }

        return this.coordinatesCache;
    }

}
