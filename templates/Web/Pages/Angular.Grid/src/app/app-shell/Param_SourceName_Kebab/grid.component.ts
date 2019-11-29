import { Component, OnInit } from '@angular/core';

import { GridService } from './grid.service';
import { IGridTextItem } from './grid.model';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  greyBoxUrl = '../../../assets/GreyBox.svg';
  warningMessageText:string = '';
  warningMessageOpen:boolean = false;
  gridItems$: Observable<IGridTextItem[]>;

  constructor(private gridService: GridService) {}

  ngOnInit() {
    this.gridItems$ = this.gridService.getGridItems();
    this.gridItems$.pipe(catchError((error) => {
      this.warningMessageText =  `Request to get grid text failed: ${error}`;
      this.warningMessageOpen = true;
      return of(null);
    })).subscribe();
  }

  handleWarningClose(open: boolean) {
    this.warningMessageOpen = open;
    this.warningMessageText = '';
  }
}
