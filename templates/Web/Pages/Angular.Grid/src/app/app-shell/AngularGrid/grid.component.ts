import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../constants';
import { IGridTextItem } from './GridBox/grid-box.component';
import { GridService } from './grid.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

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
  constructor(private gridService: GridService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'grey-box',
      sanitizer.bypassSecurityTrustResourceUrl('assets/GreyBox.svg'));
  }

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
