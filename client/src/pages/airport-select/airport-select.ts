import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Airport} from "../../interfaces/airport.interface";
import {AirportService} from "../../providers/services/airport.service";
import {AirportWaitTimesPage} from "../airport-wait-times/airport-wait-times";
import {UserInfoService} from "../../providers/services/user-info-service";

@Component({
    selector: 'page-airport-select',
    templateUrl: 'airport-select.html'
})
export class AirportSelectPage implements OnInit {
    allAirports: Array<Airport>;
    searchText: string;
    nearbyAirports: Array<Airport> = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private airportService: AirportService,
                private userInfo : UserInfoService) {
    }

    ionViewDidLoad() {
    }

    ngOnInit() {
        this.airportService.getAirports().then((resp) => {
            this.allAirports = resp;
            this.userInfo.getUserCoordinates().then((resp) => {
                // TODO if this is running too slowly, consider making a call for getUserCoordinates earlier.
                // The result will be cached.
                this.nearbyAirports = this.airportService.getNearbyAirports(this.airportService.airports, resp);
            })
        });
    }

    selectAirport(airport) {
        this.airportService.selectAirport(airport);
        this.airportService.getAirportByShortcode(airport.shortcode).then(() => {
            this.navCtrl.push(AirportWaitTimesPage);
        });
    }

}
