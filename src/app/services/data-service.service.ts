import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, count } from 'rxjs/operators';
import { GlobalDataSummary } from '../models/global.data.model';
import { CommentStmt } from '@angular/compiler';
import { countryData } from '../utils/country.central';
import { CountryDataSummery } from '../models/country.data.model';
import { countryFlagData } from '../utils/country.flag';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  private globalDataUrl;

  private datewiseDataUrl =
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
  countryData: [];
  countryFlagData;
  constructor(private http: HttpClient) {
    this.countryData = countryData;
    this.countryFlagData = countryFlagData;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    dd = parseInt(dd) - 2 + '';
    let date = mm + '-' + dd + '-' + yyyy;
    this.globalDataUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${date}.csv`;

    console.log(this.globalDataUrl);
  }

  getDateWiseData() {
    return this.http.get(this.datewiseDataUrl, { responseType: 'text' }).pipe(
      map((result) => {
        let rows = result.split('\n');
        let header = rows[0];
        let dates = header.split(/,(?=\S)/);
        let mainData = {};
        dates.splice(0, 4);
        rows.splice(0, 1);
        rows.forEach((row) => {
          let cols = row.split(/,(?=\S)/);
          let country = cols[1];
          cols.splice(0, 4);
          mainData[country] = [];
          cols.forEach((value, index) => {
            let dw = {
              cases: +value,
              country: country,
              date: dates[index],
            };
            mainData[country].push(dw);
          });
        });

        return mainData;
      })
    );
  }

  getGlobalData(country: string) {
    return this.http.get(this.globalDataUrl, { responseType: 'text' }).pipe(
      map((result) => {
        let data: GlobalDataSummary[] = [];
        let rows = result.split('\n');
        rows.splice(0, 1);
        rows.forEach((row) => {
          let cols = row.split(/,(?=\S)/);
          if (cols[3] === country) {
            data.push({
              country: cols[3],
              state: cols[2],
              confirmed: +cols[7],
              deaths: +cols[8],
              recovered: +cols[9],
              active: +cols[10],
              lat: +cols[5],
              long: +cols[6],
            });
          }
        });
        return Object.values(data);
      })
    );
  }

  getGlobalCountryData() {
    return this.http.get(this.globalDataUrl, { responseType: 'text' }).pipe(
      map((result) => {
        let data: GlobalDataSummary[] = [];
        let raw = {};
        let rows = result.split('\n');
        rows.splice(0, 1);
        rows.forEach((row) => {
          let cols = row.split(/,(?=\S)/);

          let cs = {
            country: cols[3],
            confirmed: +cols[7],
            deaths: +cols[8],
            recovered: +cols[9],
            active: +cols[10],
          };

          let temp: GlobalDataSummary = raw[cs.country];
          if (temp) {
            temp.active = cs.active + temp.active;
            temp.confirmed = cs.confirmed + temp.confirmed;
            temp.deaths = cs.deaths + temp.deaths;
            temp.recovered = cs.recovered + temp.recovered;
            raw[cs.country] = temp;
          } else {
            raw[cs.country] = cs;
          }

          data.push(raw);
        });
        let countryList = Object.values(raw);

        countryList.forEach((c1: GlobalDataSummary) => {
          let requiredCountry = this.countryData.filter(
            (country: CountryDataSummery) => country.country === c1.country
          );
          // console.log(requiredCountry[0]);
          if (requiredCountry[0] !== undefined) {
            let country: CountryDataSummery = requiredCountry[0];
            c1.lat = country.latitude;
            c1.long = country.longitude;
          }
        });

        countryList.forEach((c1: GlobalDataSummary) => {
          let requiredCountry = this.countryFlagData.filter(
            (country) => country.Country === c1.country
          );
          // console.log(requiredCountry[0]);
          if (requiredCountry[0] !== undefined) {
            let country = requiredCountry[0];
            c1.flagUrl = country.ImageURL;
          }
        });

        return Object.values(countryList);
      })
    );
  }
}
