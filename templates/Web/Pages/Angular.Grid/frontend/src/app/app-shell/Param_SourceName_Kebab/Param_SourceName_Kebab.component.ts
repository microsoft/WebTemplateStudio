import { Component, OnInit } from '@angular/core';

import { Param_SourceName_PascalService } from './Param_SourceName_Kebab.service';
import { IParam_SourceName_PascalItem } from './Param_SourceName_Kebab.model';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './Param_SourceName_Kebab.component.html',
  styleUrls: ['./Param_SourceName_Kebab.component.css']
})
export class Param_SourceName_PascalComponent implements OnInit {
  greyBoxUrl = '../../../assets/GreyBox.svg';
  warningMessageText = '';
  warningMessageOpen = false;
  gridItems$: Observable<IParam_SourceName_PascalItem[]>;

  constructor(private gridService: Param_SourceName_PascalService) {}

  ngOnInit() {
    this.gridItems$ = this.gridService.getGridItems().pipe(catchError((error) => {
      this.warningMessageText =  `Request to get grid text failed: ${error}`;
      this.warningMessageOpen = true;
      return of(null);
    }));
  }

  handleWarningClose(open: boolean) {
    this.warningMessageOpen = open;
    this.warningMessageText = '';
  }
}
