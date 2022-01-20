import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Payments from '../models/Payments';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, of as observableOf} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

   private API_URL: string = 'http://localhost:3000/payments';
   payments$ = new BehaviorSubject<Payments[] | null>(null);

  constructor(private http: HttpClient) { }

   getPaymentsApi() {
    return this.http.get<Payments[]>(this.API_URL).pipe(
      catchError( this.handleError('getPaymentsApi()', []))
    );
  }

   createPaymentApi(payment: Payments){
    let headers =  new HttpHeaders();
    headers.append( 'Content-Type', 'application/json' );
    let body = payment;
    return this.http.post(this.API_URL, body,{headers: headers}).pipe(catchError(this.handleError('createPaymentApi')));

  }
  private handleError<T>(operation ='operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      return observableOf( result as T);
    }
  }
}
