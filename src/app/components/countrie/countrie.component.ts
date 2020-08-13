import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global.data.model';
import { elementAt } from 'rxjs/operators';
import { month } from '../../utils/month.data';

@Component({
  selector: 'app-countrie',
  templateUrl: './countrie.component.html',
  styleUrls: ['./countrie.component.css'],
})
export class CountrieComponent implements OnInit {
  data: GlobalDataSummary[];
  countries: string[] = [];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  selectedCountryData;
  dateWiseData;

  selectedCounty: string;

  AreaChartData = new Array();
  MonthData = new Array();
  constructor(private dataService: DataServiceService) {}

  chart = {
    AreaChart: 'AreaChart',
    AreaChart_title: ``,
    width: 1400,
    height: 500,
    columnNames: ['Covid', 'Cases'],
    options: {
      animation: {
        duration: 1000,
        easing: 'out',
      },
    },
  };

  ngOnInit(): void {
    this.dataService.getDateWiseData().subscribe((result) => {
      this.dateWiseData = result;
    });

    this.dataService.getGlobalCountryData().subscribe((result) => {
      this.data = result;
      this.data.forEach((cs) => {
        this.countries.push(cs.country);
      });
      this.updateValues('US');
    });
  }
  updateValues(country: string) {
    this.selectedCounty = 'Covid-19 Confirmed Cases Date Wise in ' + country;
    this.AreaChartData = [];
    // console.log(value);
    this.data.forEach((cs) => {
      if (cs.country == country) {
        this.totalActive = cs.active;
        this.totalConfirmed = cs.confirmed;
        this.totalDeaths = cs.deaths;
        this.totalRecovered = cs.recovered;
      }
    });

    this.selectedCountryData = this.dateWiseData[country];
    this.selectedCountryData.forEach((element) => {
      // console.log(element);
      let month = this.convert(new Date(element.date));
      let cases = element.cases;

      let dayWiseData: [String, number] = [month, cases];
      this.AreaChartData.push(dayWiseData);
    });
    // console.log(this.AreaChartData);
  }

  convert(str) {
    var today = new Date(str);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return dd + '-' + mm + '-' + yyyy;
  }

  getMonthFromDate(str) {
    var date = new Date(str);
    return ('0' + (date.getMonth() + 1)).slice(-2);
  }

  // console.log(convert("Thu Jun 09 2011 00:00:00 GMT+0530 (India Standard Time)"))
}
