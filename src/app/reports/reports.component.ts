import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { ReportsService } from '../reports/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
})

export class ReportsComponent  implements OnInit {
  pieChartData;
  pieChartAjaxData;
  columnChartData;
  columnChartAjaxData;

  constructor(private reportsService: ReportsService) {

  }

  ngOnInit() {
    this.getPieChartData();
    this.getColumnChartData();
  }

  getPieChartData(): void {

    this.reportsService.getPieChartData().subscribe(
      data => {
        this.pieChartAjaxData = data;
      },
      err => console.error(err),
      () => {
        this.pieChartData =  {
          chartType: 'PieChart',
          dataTable: this.pieChartAjaxData,
          options: {
            'legend': 'bottom',
            'is3D': true,
            'width': '90%',
            'height': '400'
          }
        };
      }
    );
  }

getColumnChartData(): void {

  this.reportsService.getColumnChartData().subscribe(
    data => {
      this.columnChartAjaxData = data;
    },
    err => console.error(err),
    () => {
      this.columnChartData =  {
        chartType: 'ColumnChart',
        dataTable: this.columnChartAjaxData,
        options: {
          'legend': 'bottom',
           'width': '100%',
          'height': '400'
        }
      };
    }
  );
}

}

