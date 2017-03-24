import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {AirportSelectPage} from '../pages/airport-select/airport-select';
import {AirportApi} from "../providers/api/airport-api.service";
import {AirportNamePipe} from "../pipes/airportName.pipe";
import {AirportShortcodeMatchPipe} from "../pipes/airportShortcodeMatch";
import {AirportService} from "../providers/services/airport.service";
import {AirportWaitTimesPage} from "../pages/airport-wait-times/airport-wait-times";
import {UserInfoService} from "../providers/services/user-info-service";

@NgModule({
    declarations: [
        MyApp,
        AirportSelectPage,
        AirportNamePipe,
        AirportShortcodeMatchPipe,
        AirportWaitTimesPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AirportSelectPage,
        AirportWaitTimesPage
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AirportApi,
        AirportService,
        UserInfoService
    ]
})
export class AppModule {
}
