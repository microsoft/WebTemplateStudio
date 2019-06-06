import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from 'src/constants';
import { IMasterDetailText } from './MasterDetailPage/master-detail-page.component';
import { MasterDetailService } from './master-detail.service';

@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.css']
})
export class MasterDetailComponent implements OnInit {

  GreyAvatar = require('../../images/GreyAvatar.svg') as string;
  WarningMessageText = CONSTANTS.ERROR_MESSAGE.MASTERDETAIL_GET;
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
        this.WarningMessageText = `${CONSTANTS.ERROR_MESSAGE.MASTERDETAIL_GET} ${error}`;
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


