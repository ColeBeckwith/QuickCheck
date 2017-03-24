import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AirportService} from "../../providers/services/airport.service";
import {OnInit} from "../../../node_modules/@angular/core/src/metadata/lifecycle_hooks";

/*
 Generated class for the AirportWaitTimes page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-airport-wait-times',
    templateUrl: 'airport-wait-times.html'
})
export class AirportWaitTimesPage implements OnInit {
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public airportService: AirportService) {
    }

    ionViewDidLoad() {

    }

    ngOnInit() {
        this.airportService.getMostRecentCheckpointTimes();
    }

}
