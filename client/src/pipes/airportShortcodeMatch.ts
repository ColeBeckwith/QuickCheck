import {Pipe, PipeTransform} from "@angular/core";


@Pipe({name: 'airportShortcodeMatch'})
export class AirportShortcodeMatchPipe implements PipeTransform {
    transform(airports, searchText) {
        if (!searchText) {
            return;
        }
        if (airports) {
            return airports.filter(airport => {
                if (airport.shortcode.toLowerCase() === searchText.toLowerCase()) {
                    return airport;
                }
            });
        }
    }
}
