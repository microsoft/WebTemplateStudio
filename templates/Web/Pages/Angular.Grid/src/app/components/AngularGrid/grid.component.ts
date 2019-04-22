import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../constants';
import { IGridTextItem } from './GridBox/grid-box.component';
import { GridService } from './grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  GreyBox = require('../../images/GreyBox.svg') as string;
  WarningMessageText = CONSTANTS.ERROR_MESSAGE.GRID_GET;
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
        this.WarningMessageText = `${CONSTANTS.ERROR_MESSAGE.GRID_GET} ${error}`;
      }
    );
  }
  handleWarningClose(open: boolean) {
    this.WarningMessageOpen = open;
    this.WarningMessageText = "";
  }
}
