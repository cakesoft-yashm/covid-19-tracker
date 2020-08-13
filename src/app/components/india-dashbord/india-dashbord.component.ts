import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global.data.model';

@Component({
  selector: 'app-india-dashbord',
  templateUrl: './india-dashbord.component.html',
  styleUrls: ['./india-dashbord.component.scss'],
})
export class IndiaDashbordComponent implements OnInit {
  dataTable = [];
  globalData: GlobalDataSummary[];
  constructor(private dataService: DataServiceService) {}

  chart = {
    PieChart: 'PieChart',
    ColumnChart: 'ColumnChart',
    PieChart_title: 'Covid-19 India Top 15 State Cases in %',
    ColumnChart_title: 'Covid-19 India Top 15 State Cases',
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

  ngOnInit(): void {
    this.dataService.getGlobalData('India').subscribe({
      next: (result) => {
        this.globalData = result;
        this.initChart('con');
      },
    });
  }
  updateChart(type: String) {
    this.initChart(type);
  }

  initChart(casesType: String) {
    // console.log(casesType);

    this.dataTable = [];

    let sortedData = this.globalData.sort((a, b) => b.confirmed - a.confirmed);

    sortedData.forEach((cs, i) => {
      switch (casesType) {
        case 'con':
          if (i < 15) {
            this.dataTable.push([cs.state, cs.confirmed]);
          }
          break;
        case 'rec':
          if (i < 15) {
            this.dataTable.push([cs.state, cs.recovered]);
          }
          break;
        case 'act':
          if (i < 15) {
            this.dataTable.push([cs.state, cs.active]);
          }
          break;
        case 'dea':
          if (i < 15) {
            this.dataTable.push([cs.state, cs.deaths]);
          }
          break;
        default:
          break;
      }
    });
  }

  numberWithCommas(x: number) {
    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
}
