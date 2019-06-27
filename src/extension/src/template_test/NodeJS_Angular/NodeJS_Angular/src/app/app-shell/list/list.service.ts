import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private listUrl = environment.endpoint.list;

  constructor(private http: HttpClient) { }

  getListItems(): Observable<IListItem[]> {
    return this.http.get<IListItem[]>(this.listUrl);
  }

  addListItem(inputText: string): Observable<IListItem> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = JSON.stringify({
      text: inputText
    });
    return this.http.post<IListItem>(this.listUrl, body, httpOptions);
  }

  deleteListItem(id: number): Observable<IListItem> {
    return this.http.delete<IListItem>(`${environment.endpoint.list}/${id}`);
  }
}

export interface IListItem {
  _id: number;
  text: string;
}

