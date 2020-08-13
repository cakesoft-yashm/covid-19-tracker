import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CountrieComponent } from './components/countrie/countrie.component';
import { HttpClientModule } from '@angular/common/http';
import { DashbordCardComponent } from './components/dashbord-card/dashbord-card.component';

import { GoogleChartsModule } from 'angular-google-charts';
import { MapComponent } from './components/map/map.component';
import { IndiaDashbordComponent } from './components/india-dashbord/india-dashbord.component';
import { IndiaMapComponent } from './components/india-map/india-map.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CountrieComponent,
    DashbordCardComponent,
    MapComponent,
    IndiaDashbordComponent,
    IndiaMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
