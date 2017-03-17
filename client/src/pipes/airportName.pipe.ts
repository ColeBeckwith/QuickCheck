import {Pipe, PipeTransform} from "@angular/core";
import {Airport} from "../interfaces/airport.interface";


@Pipe({name: 'airportName'})
export class AirportNamePipe implements PipeTransform {
    transform(value : Array<Airport>, searchText) {
        if (value) {
            return value.filter((value : Airport) => {
                if (searchText === '' || !searchText) {
                    return value;
                }
                if (value.name.toLowerCase().includes(searchText.toLowerCase())) {
                    return value;
                }
            });
        }
    }
}
