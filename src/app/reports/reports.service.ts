import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ReportsService {

    constructor(private http: HttpClient) {
    }


    getPieChartData() {
        return this.http.get('assets/json/pieChart.json');
    }

    getColumnChartData() {
        return this.http.get('assets/json/columnChart.json');
    }

}
