import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ISampleOrder } from './master-detail.model';

@Injectable({providedIn: 'root'})
export class MasterDetailService {
  private listUrl = environment.endpoint.masterdetail;

  constructor(private http: HttpClient) {}

  // see https://angular.io/guide/http#getting-error-details
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  getMasterDetailItems(): Observable<ISampleOrder[]> {
    return this.http
      .get<ISampleOrder[]>(this.listUrl)
      .pipe(catchError(this.handleError));
  }
}
