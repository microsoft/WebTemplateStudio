import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IGridTextItem } from './grid.model';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  private listUrl = environment.endpoint.grid;

  constructor(private http: HttpClient) { }

  getGridItems(): Observable<IGridTextItem[]> {
    return this.http.get<IGridTextItem[]>(this.listUrl);
  }
}
