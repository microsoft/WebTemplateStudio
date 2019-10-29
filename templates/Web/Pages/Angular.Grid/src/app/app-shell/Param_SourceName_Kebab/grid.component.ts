import { Component, OnInit } from '@angular/core';

import { GridService } from './grid.service';
import { IGridTextItem } from './grid.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  greyBox = require('../../../assets/GreyBox.svg') as string;
  warningMessageText = 'Request to get grid text failed:';
  warningMessageOpen = false;
  gridTextAssets: IGridTextItem[] = [
    {
      description: 'example1',
      header: 'example1',
      id: 0
    },
    {
      description: 'example2',
      header: 'example2',
      id: 1
    }
  ];

  constructor(private gridService: GridService) {}

  ngOnInit() {
    this.gridService.getGridItems().subscribe(
      (result: IGridTextItem[]) => {
        this.gridTextAssets = result;
      },
      error => {
        this.warningMessageOpen = true;
        this.warningMessageText = `Request to get grid text failed: ${error}`;
      }
    );
  }

  handleWarningClose(open: boolean) {
    this.warningMessageOpen = open;
    this.warningMessageText = '';
  }
}
