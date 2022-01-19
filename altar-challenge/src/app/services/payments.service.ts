import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Payments from '../models/Payments';
//import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, of as observableOf} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  // private API_URL: string = 'http://localhost:3000/payments';
  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  constructor() { }



  // createPaymentApi(payment: Payments){
  //   let jsonPayment = JSON.stringify(payment);

  //   return this.http.post<Payments>(this.API_URL, payment, this.httpOptions).pipe(
  //     catchError(this.handleError<Payments>('createPayment'))
  //   )

  // }
  // private handleError<T>(operation ='operation', result?: T){
  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     return observableOf( result as T);
  //   }
  // }


   getPayments() {}

  //  getPaymentsApi(): Observable<Payments[]> {
  //   return this.http.get<Payments[]>(this.API_URL).pipe(
  //     catchError( this.handleError<Payments[]>('getAll()', []))
  //   );
  // }
}
