import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global.data.model';
import { CastExpr } from '@angular/compiler';
import { circle } from 'leaflet';
declare let L;
@Component({
  selector: 'app-india-map',
  templateUrl: './india-map.component.html',
  styleUrls: ['./india-map.component.scss'],
})
export class IndiaMapComponent implements OnInit {
  mapData = [];
  map1;
  caseType: string;
  constructor(private dataService: DataServiceService) {
    // this.updateChart('confirmed');
  }

  ngOnInit(): void {
    this.mapPrint();
  }

  mapPrint() {
    this.map1 = L.map('indiamap').setView([23.259933, 77.412613], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map1);
    this.updateChart('confirmedi');
  }

  updateChart(caseType: string) {
    this.caseType = caseType;
    this.dataService.getGlobalData('India').subscribe({
      next: (data) => {
        if (data.length > 0) {
          data.forEach((d: GlobalDataSummary) => {
            if ('lat' in d) {
              console.log(this.caseType);
              if (this.caseType === 'confirmedi') {
                var circleCenter = [d.lat, d.long];
                var circleOptions = {
                  color: 'blue',
                  fillColor: 'blue',
                  fillOpacity: 0.4,
                };
                var circle = L.circle(
                  circleCenter,
                  Math.sqrt(d.confirmed) * 300,
                  circleOptions
                );
                circle.addTo(this.map1);
              }
              if (this.caseType === 'recoveredi') {
                var circleCenter = [d.lat, d.long];
                var circleOptions = {
                  color: 'green',
                  fillColor: 'green',
                  fillOpacity: 0.4,
                };
                var circle = L.circle(
                  circleCenter,
                  Math.sqrt(d.confirmed) * 300,
                  circleOptions
                );

                circle.addTo(this.map1);
              }
              if (this.caseType === 'activei') {
                var circleCenter = [d.lat, d.long];
                var circleOptions = {
                  color: 'darkcyan',
                  fillColor: 'darkcyan',
                  fillOpacity: 0.4,
                };
                var circle = L.circle(
                  circleCenter,
                  Math.sqrt(d.confirmed) * 300,
                  circleOptions
                );
                circle.addTo(this.map1);
              }
              if (this.caseType === 'deathsi') {
                var circleCenter = [d.lat, d.long];
                var circleOptions = {
                  color: 'red',
                  fillColor: 'red',
                  fillOpacity: 0.4,
                };
                var circle = L.circle(
                  circleCenter,
                  Math.sqrt(d.confirmed) * 300,
                  circleOptions
                );
                circle.addTo(this.map1);
              }
            }
          });
        }
      },
    });
  }
}
