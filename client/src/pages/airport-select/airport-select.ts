import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Airport} from "../../interfaces/airport.interface";
import {AirportService} from "../../providers/services/airport.service";
import {AirportWaitTimesPage} from "../airport-wait-times/airport-wait-times";

@Component({
    selector: 'page-airport-select',
    templateUrl: 'airport-select.html'
})
export class AirportSelectPage implements OnInit {
    airports: Array<Airport>;
    searchText: string;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private airportService: AirportService) {
    }

    ionViewDidLoad() {
    }

    ngOnInit() {
        this.airportService.getAirports().then((resp) => {
            this.airports = resp;
        });
    }

    selectAirport(airport) {
        this.airportService.selectAirport(airport);
        this.airportService.getAirportByShortcode(airport.shortcode).then(() => {
            this.navCtrl.push(AirportWaitTimesPage);
        });
    }

}
