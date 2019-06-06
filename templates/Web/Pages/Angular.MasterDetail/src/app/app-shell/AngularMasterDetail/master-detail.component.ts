import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from 'src/constants';
import { IMasterDetailText } from './MasterDetailPage/master-detail-page.component';
import { MasterDetailService } from './master-detail.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.css']
})
export class MasterDetailComponent implements OnInit {

  WarningMessageText = CONSTANTS.ERROR_MESSAGE.MASTERDETAIL_GET;
  WarningMessageOpen = false;
  currentDisplayTabIndex = 0;
  masterDetailText: IMasterDetailText[] = [];

  constructor(private masterDetailService: MasterDetailService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'grey-avatar',
        sanitizer.bypassSecurityTrustResourceUrl('assets/GreyAvatar.svg'));
  }

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


