import { Component, OnInit } from '@angular/core';

import { MasterDetailService } from './master-detail.service';
import { ISampleOrder } from './master-detail.model';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.css']
})
export class MasterDetailComponent implements OnInit {
  greyAvatarUrl = '../../../assets/GreyAvatar.svg';
  warningMessageText = 'Request to get master detail text failed:';
  warningMessageOpen = false;
  currentSampleOrder={};
  sampleOrders: Observable<ISampleOrder[]>;

  constructor(private masterDetailService: MasterDetailService) {}

  ngOnInit() {
    this.sampleOrders = this.masterDetailService.getMasterDetailItems();
    this.sampleOrders.pipe(catchError((error) => { 
      this.warningMessageText = 'Request to get master detail text failed: ${error}'; 
      this.warningMessageOpen = true; 
      return of(null);
    }))
    .subscribe(listSampleOrders => {
      this.currentSampleOrder = listSampleOrders[0];
    });
  }

  selectSampleOrder(sampleOrder: ISampleOrder) {
    this.currentSampleOrder = sampleOrder;
  }

  handleWarningClose(open: boolean) {
    this.warningMessageOpen = open;
    this.warningMessageText = '';
  }
}
