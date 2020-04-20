import { Component, OnInit } from '@angular/core';

import { AngularGridService } from './Param_SourceName_Kebab.service';
import { IAngularGridTextItem } from './Param_SourceName_Kebab.model';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './Param_SourceName_Kebab.component.html',
  styleUrls: ['./Param_SourceName_Kebab.component.css']
})
export class AngularGridComponent implements OnInit {
  greyBoxUrl = '../../../assets/GreyBox.svg';
  warningMessageText = '';
  warningMessageOpen = false;
  gridItems$: Observable<IAngularGridTextItem[]>;

  constructor(private gridService: AngularGridService) {}

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
