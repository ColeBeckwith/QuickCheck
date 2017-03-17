import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {AirportSelectPage} from '../pages/airport-select/airport-select';
import {AirportApi} from "../providers/api/airport-api.service";
import {AirportNamePipe} from "../pipes/airportName.pipe";
import {AirportShortcodeMatchPipe} from "../pipes/airportShortcodeMatch";
import {AirportService} from "../providers/services/airport.service";

@NgModule({
    declarations: [
        MyApp,
        AirportSelectPage,
        AirportNamePipe,
        AirportShortcodeMatchPipe
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AirportSelectPage
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AirportApi,
        AirportService
    ]
})
export class AppModule {
}
