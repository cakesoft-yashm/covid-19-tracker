import { Component, OnInit, Input } from '@angular/core';
import { Marker, icon } from 'leaflet';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global.data.model';
declare let L;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  mapData = [];
  map;
  caseType: string;

  constructor(private dataService: DataServiceService) {
    this.updateChart('confirmed');
  }

  ngOnInit(): void {
    this.map = L.map('map').setView([16.956232, -0.344245], 3);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  updateChart(caseType: string) {
    this.caseType = caseType;
    this.dataService.getGlobalCountryData().subscribe({
      next: (data) => {
        if (data.length > 0) {
          data.forEach((d: GlobalDataSummary) => {
            if ('lat' in d) {
              if (this.caseType === 'confirmed') {
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
                circle.addTo(this.map);
              }
              if (this.caseType === 'recovered') {
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
                circle.addTo(this.map);
              }
              if (this.caseType === 'active') {
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
                circle.addTo(this.map);
              }
              if (this.caseType === 'deaths') {
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
                circle.addTo(this.map);
              }
            }
          });
        }
      },
    });
  }

  getData(data: []) {
    if (data.length > 0) {
      data.forEach((d: GlobalDataSummary) => {
        // console.log(data);

        const marker = new Marker([d.lat, d.long]).setIcon(
          icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'https://image.flaticon.com/icons/svg/3254/3254055.svg',
          })
        );
        marker.addTo(this.map);
      });

      const marker2 = new Marker([19.449759, 76.108221]).setIcon(
        icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'https://image.flaticon.com/icons/svg/3254/3254055.svg',
        })
      );
      marker2.addTo(this.map);
    }
  }
}
