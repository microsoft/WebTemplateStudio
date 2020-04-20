import { Component, OnInit, Input } from '@angular/core';
import { IAngularGridTextItem } from '../Param_SourceName_Kebab.model';

@Component({
  selector: 'app-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.css']
})
export class GridItemComponent implements OnInit {
  @Input() key: number;
  @Input() gridItem: IAngularGridTextItem;

  constructor() {}

  ngOnInit() {}
}
