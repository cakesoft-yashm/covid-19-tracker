import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { GlobalDataSummary } from '../../models/global.data.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData: GlobalDataSummary[];
  constructor(private dataService: DataServiceService) {}
  casesType: string;

  dataTable = [];
  mapData = [];

  selectedCaseType: String;

  chart = {
    PieChart: 'PieChart',
    ColumnChart: 'ColumnChart',
    PieChart_title: 'Covid-19 world Top 10 country cases in %',
    ColumnChart_title: 'Covid-19 world Top 10 country cases',
    width: 300,
    height: 300,
    columnNames: ['Covid', 'Cases'],
    options: {
      animation: {
        duration: 1000,
        easing: 'out',
      },
    },
  };

  ngAfterViewInit(): void {
    // getting data for card
    this.dataService.getGlobalCountryData().subscribe({
      next: (result) => {
        this.globalData = result;
        result.forEach((cs: GlobalDataSummary) => {
          if (!Number.isNaN(cs.confirmed)) {
            this.totalActive += cs.active;
            this.totalRecovered += cs.recovered;
            this.totalConfirmed += cs.confirmed;
            this.totalDeaths += cs.deaths;
          }
        });
        this.initChart('c');
      },
    });
  }

  initChart(casesType: string) {
    // console.log(casesType);
    this.casesType = casesType;
    this.dataTable = [];

    let sortedData = this.globalData.sort((a, b) => b.confirmed - a.confirmed);

    sortedData.forEach((cs, i) => {
      switch (casesType) {
        case 'c':
          if (i < 10) {
            this.dataTable.push([cs.country, cs.confirmed]);
          }
          break;
        case 'r':
          if (i < 10) {
            this.dataTable.push([cs.country, cs.recovered]);
          }
          break;
        case 'a':
          if (i < 10) {
            this.dataTable.push([cs.country, cs.active]);
          }
          break;
        case 'd':
          if (i < 10) {
            this.dataTable.push([cs.country, cs.deaths]);
          }
          break;
        default:
          break;
      }
    });
    // console.log(this.dataTable);
  }

  updateChart(type: string) {
    this.initChart(type);
  }

  numberWithCommas(x: number) {
    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
}
