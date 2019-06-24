import { Component, OnInit } from '@angular/core';

import { MasterDetailService, IMasterDetailText } from './master-detail.service';

@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.css']
})
export class MasterDetailComponent implements OnInit {

  GreyAvatar = require('../../../assets/GreyAvatar.svg') as string;
  WarningMessageText = 'Request to get master detail text failed:';
  WarningMessageOpen = false;
  currentDisplayTabIndex = 0;
  masterDetailText: IMasterDetailText[] = [];

  constructor(private masterDetailService: MasterDetailService) { }

  ngOnInit() {
    this.masterDetailService.getMasterDetailItems().subscribe(
      result => {
        this.masterDetailText = result;
      },
      error => {
        this.WarningMessageOpen = true;
        this.WarningMessageText = `Request to get master detail text failed: ${error}`;
      }
    );
  }

  handleDisplayTabClick(id: number) {
    this.currentDisplayTabIndex = id;
  }
  handleWarningClose(open: boolean) {
    this.WarningMessageOpen = open;
    this.WarningMessageText = '';
  }
}


