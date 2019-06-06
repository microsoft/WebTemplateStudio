import { Injectable } from '@angular/core';
import { CONSTANTS } from 'src/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  private listUrl = CONSTANTS.ENDPOINT.GRID;

  constructor(private http: HttpClient) {}

  getGridItems(): Observable<IGridTextItem[]> {
      return this.http.get<IGridTextItem[]>(this.listUrl);
  }
}


export interface IGridTextItem {
  description: string;
  header: string;
  id: number;
}

