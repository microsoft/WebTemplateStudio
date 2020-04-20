import { Component, OnInit } from '@angular/core';

import { AngularMasterDetailService } from './Param_SourceName_Kebab.service';
import { ISampleOrder } from './Param_SourceName_Kebab.model';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-master-detail',
  templateUrl: './Param_SourceName_Kebab.component.html',
  styleUrls: ['./Param_SourceName_Kebab.component.css']
})
export class AngularMasterDetailComponent implements OnInit {
  greyAvatarUrl = '../../../assets/GreyAvatar.svg';
  warningMessageText = '';
  warningMessageOpen = false;
  currentSampleOrder: ISampleOrder;
  sampleOrders$: Observable<ISampleOrder[]>;

  constructor(private masterDetailService: AngularMasterDetailService) {}

  ngOnInit() {
    this.sampleOrders$ = this.masterDetailService.getMasterDetailItems().pipe(catchError((error) => {
      this.warningMessageText = `Request to get master detail text failed: ${error}`;
      this.warningMessageOpen = true;
      return of(null);
    }), map(listSampleOrders => {
      this.currentSampleOrder = listSampleOrders[0];
      return listSampleOrders;
    }));
  }

  selectSampleOrder(sampleOrder: ISampleOrder) {
    this.currentSampleOrder = sampleOrder;
  }

  handleWarningClose(open: boolean) {
    this.warningMessageOpen = open;
    this.warningMessageText = '';
  }
}
