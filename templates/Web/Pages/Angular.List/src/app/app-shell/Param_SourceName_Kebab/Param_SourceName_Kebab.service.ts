import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { IParam_SourceName_PascalItem } from './Param_SourceName_Kebab.model';

@Injectable({providedIn: 'root'})
export class Param_SourceName_PascalService {
  private listUrl = environment.endpoint.list;

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

  getListItems(): Observable<IParam_SourceName_PascalItem[]> {
    return this.http
      .get<IParam_SourceName_PascalItem[]>(this.listUrl)
      .pipe(catchError(this.handleError));
  }

  addListItem(inputText: string): Observable<IParam_SourceName_PascalItem> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const body = JSON.stringify({
      text: inputText
    });

    return this.http
      .post<IParam_SourceName_PascalItem>(this.listUrl, body, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteListItem(id: string): Observable<IParam_SourceName_PascalItem> {
    return this.http
      .delete<IParam_SourceName_PascalItem>(`${environment.endpoint.list}/${id}`)
      .pipe(catchError(this.handleError));
  }
}
