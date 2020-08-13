import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashbord-card',
  templateUrl: './dashbord-card.component.html',
  styleUrls: ['./dashbord-card.component.css'],
})
export class DashbordCardComponent implements OnInit {
  @Input('totalConfirmed')
  totalConfirmed;
  @Input('totalRecovered')
  totalRecovered;
  @Input('totalActive')
  totalActive;
  @Input('totalDeaths')
  totalDeaths;

  constructor() {}

  ngOnInit(): void {}

  transform(input: any, args?: any): any {
    var exp,
      rounded,
      suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];

    if (Number.isNaN(input)) {
      return null;
    }

    if (input < 1000) {
      return input;
    }

    exp = Math.floor(Math.log(input) / Math.log(1000));

    return (input / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];
  }

  numberWithCommas(x: number) {
    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
}
