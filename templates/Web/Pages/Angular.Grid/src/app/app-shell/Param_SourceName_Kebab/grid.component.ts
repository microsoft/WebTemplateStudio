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
  warningMessageText = 'Request to get grid text failed:';
  warningMessageOpen = false;
  listItems: Observable<IGridTextItem[]>;

  constructor(private gridService: GridService) {}

  ngOnInit() {
    this.listItems = this.gridService.getGridItems();
    this.listItems.pipe(catchError((error) => { 
      this.warningMessageText =  `Request to get grid text failed: ${error}`;
      this.warningMessageOpen = true; 
      return of(null);
    })).subscribe();
  }
}
