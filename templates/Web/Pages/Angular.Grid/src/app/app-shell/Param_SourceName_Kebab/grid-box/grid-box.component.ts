import { Component, OnInit, Input } from '@angular/core';
import { IGridTextItem } from '../grid.model';

@Component({
  selector: 'app-grid-box',
  templateUrl: './grid-box.component.html',
  styleUrls: ['./grid-box.component.css']
})
export class GridBoxComponent implements OnInit {
  @Input() key: number;
  @Input() gridItem: IGridTextItem;

  constructor() {}

  ngOnInit() {}
}
