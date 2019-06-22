import { Component, OnInit } from '@angular/core';

import { GridService, IGridTextItem } from './grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  GreyBox = require('../../../assets/GreyBox.svg') as string;
  WarningMessageText = 'Request to get grid text failed:';
  WarningMessageOpen = false;
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
  constructor(private gridService: GridService) { }

  ngOnInit() {
    this.gridService.getGridItems().subscribe(
      result => {
        this.gridTextAssets = result;
      },
      error => {
        this.WarningMessageOpen = true;
        this.WarningMessageText = `Request to get grid text failed: ${error}`;
      }
    );
  }
  handleWarningClose(open: boolean) {
    this.WarningMessageOpen = open;
    this.WarningMessageText = '';
  }
}
