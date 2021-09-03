import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { HOST_PORT } from '../config';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  handleError(error: HttpErrorResponse) {
    console.log('error occurred!');
    return throwError(error);
  }

  podaci: any;
  elements = [];
  total: number = 0;
  name: string = '';
  phoneNumber: string = '';
  email: string = '';
  t = `© ${new Date().getFullYear()} FLP`;

  constructor(public http: HttpClient) { }

  getAllData(): Observable<any> {
    return this.http.get<any>(`http://${HOST_PORT.HOST}:${HOST_PORT.PORT}/api/getalldata`)
    .pipe(catchError(this.handleError));
  }

  sendEmail(obj): Observable<any> {
    return this.http.post(`http://${HOST_PORT.HOST}:${HOST_PORT.PORT}/api/sendemail`, obj)
    .pipe(catchError(this.handleError));
  }

  counter(obj): Observable<any> {
    return this.http.put<any>(`http://${HOST_PORT.HOST}:${HOST_PORT.PORT}/api/counter`, obj)
    .pipe(catchError(this.handleError));
  }

  add(el) {
    this.total += el.cena;
  }

  remove(el) {
    this.total -= el.cena;
  }

}