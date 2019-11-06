import { Component, OnInit } from '@angular/core';

import { MasterDetailService } from './master-detail.service';
import { IMasterDetailText } from './master-detail.model';

@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.css']
})
export class MasterDetailComponent implements OnInit {
  greyAvatarUrl = '../../../assets/GreyAvatar.svg';
  warningMessageText = 'Request to get master detail text failed:';
  warningMessageOpen = false;
  currentDisplayTabIndex = 0;
  masterDetailText: IMasterDetailText[] = [];

  constructor(private masterDetailService: MasterDetailService) {}

  ngOnInit() {
    this.masterDetailService.getMasterDetailItems().subscribe(
      (result: IMasterDetailText[]) => {
        this.masterDetailText = result;
      },
      error => {
        this.warningMessageOpen = true;
        this.warningMessageText = `Request to get master detail text failed: ${error}`;
      }
    );
  }

  handleDisplayTabClick(id: number) {
    this.currentDisplayTabIndex = id;
  }

  handleWarningClose(open: boolean) {
    this.warningMessageOpen = open;
    this.warningMessageText = '';
  }
}
