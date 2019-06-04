import { Injectable } from '@angular/core';
import { CONSTANTS } from 'src/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMasterDetailText } from './MasterDetailPage/master-detail-page.component';

@Injectable({
  providedIn: 'root'
})
export class MasterDetailService {

  private listUrl = CONSTANTS.ENDPOINT.MASTERDETAIL;

  constructor(private http: HttpClient){}

  getMasterDetailItems(): Observable<IMasterDetailText[]> {
      return this.http.get<IMasterDetailText[]>(this.listUrl);
  }
}
