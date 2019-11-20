import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BarData } from '../interfaces/bar-data';
import { PieData } from '../interfaces/bar-pie';

@Injectable({
  providedIn: 'root'
})
export class DataGraphicsService {

  // Base url
  baseurl = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getDataBar(fecha_init:string, fecha_end:string): Observable<BarData>{
    return this.http.get<BarData>(this.baseurl+ 'hours-bar?start_date=' + fecha_init + '&end_date=' + fecha_end)
    .pipe(catchError(err => {
        //Handle Error
        const error = err.error.message || err.statusText;
        return throwError(error);
    }))
  }

  getDataPie(fecha_init:string, fecha_end:string): Observable<PieData>{
    return this.http.get<PieData>(this.baseurl + 'topics-char?start_date=' + fecha_init + '&end_date=' + fecha_end)
    .pipe(catchError(err => {
        //Handle Error
        const error = err.error.message || err.statusText;
        return throwError(error);
    }))
  }

  saveCall(data): Observable<any> {
    return this.http.post(this.baseurl + 'add-call',data,this.httpOptions)
  }
}
