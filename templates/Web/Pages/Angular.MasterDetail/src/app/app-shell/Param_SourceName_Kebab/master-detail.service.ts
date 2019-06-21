import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterDetailService {

  private listUrl = environment.endpoint.masterdetail;

  constructor(private http: HttpClient) { }

  getMasterDetailItems(): Observable<IMasterDetailText[]> {
    return this.http.get<IMasterDetailText[]>(this.listUrl);
  }
}

export interface IMasterDetailText {
  title: string;
  id: number;
  status: string;
  orderDate: string;
  shipTo: string;
  orderTotal: number;
  shortDescription: string;
  longDescription: string;
}
