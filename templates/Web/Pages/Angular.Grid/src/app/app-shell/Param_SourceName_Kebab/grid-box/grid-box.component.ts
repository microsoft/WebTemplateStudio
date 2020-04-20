import { Component, OnInit, Input } from '@angular/core';
import { IAngularGridTextItem } from '../Param_SourceName_Kebab.model';

@Component({
  selector: 'app-grid-box',
  templateUrl: './grid-box.component.html',
  styleUrls: ['./grid-box.component.css']
})
export class GridBoxComponent implements OnInit {
  @Input() key: number;
  @Input() gridItem: IAngularGridTextItem;

  constructor() {}

  ngOnInit() {}
}
