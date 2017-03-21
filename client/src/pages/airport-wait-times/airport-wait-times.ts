import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AirportService} from "../../providers/services/airport.service";

/*
 Generated class for the AirportWaitTimes page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-airport-wait-times',
    templateUrl: 'airport-wait-times.html'
})
export class AirportWaitTimesPage {

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public airportService: AirportService) {
    }

    ionViewDidLoad() {
        console.log(this.airportService.checkpointWaitTimes);
    }

}
