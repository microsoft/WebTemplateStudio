import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { IAngularListItem } from './Param_SourceName_Kebab.model';

@Injectable({providedIn: 'root'})
export class AngularListService {
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

  getListItems(): Observable<IAngularListItem[]> {
    return this.http
      .get<IAngularListItem[]>(this.listUrl)
      .pipe(catchError(this.handleError));
  }

  addListItem(inputText: string): Observable<IAngularListItem> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const body = JSON.stringify({
      text: inputText
    });

    return this.http
      .post<IAngularListItem>(this.listUrl, body, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteListItem(id: number): Observable<IAngularListItem> {
    return this.http
      .delete<IAngularListItem>(`${environment.endpoint.list}/${id}`)
      .pipe(catchError(this.handleError));
  }
}
