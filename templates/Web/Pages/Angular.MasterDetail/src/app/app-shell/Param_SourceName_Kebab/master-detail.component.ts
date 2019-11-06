import { Component, OnInit } from '@angular/core';

import { MasterDetailService } from './master-detail.service';
import { ISampleOrder } from './master-detail.model';

@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.css']
})
export class MasterDetailComponent implements OnInit {
  greyAvatar = require('../../../assets/GreyAvatar.svg') as string;
  warningMessageText = 'Request to get master detail text failed:';
  warningMessageOpen = false;
  currentSampleOrder={};
  sampleOrders: ISampleOrder[] = [];

  constructor(private masterDetailService: MasterDetailService) {}

  ngOnInit() {
    this.masterDetailService.getMasterDetailItems().subscribe(
      (result: ISampleOrder[]) => {
        this.sampleOrders = result;
        this.currentSampleOrder = result[0];
      },
      error => {
        this.warningMessageOpen = true;
        this.warningMessageText = `Request to get master detail text failed: ${error}`;
      }
    );
  }

  handleDisplayTabClick(sampleOrder: ISampleOrder) {
    this.currentSampleOrder = sampleOrder;
  }

  handleWarningClose(open: boolean) {
    this.warningMessageOpen = open;
    this.warningMessageText = '';
  }
}
