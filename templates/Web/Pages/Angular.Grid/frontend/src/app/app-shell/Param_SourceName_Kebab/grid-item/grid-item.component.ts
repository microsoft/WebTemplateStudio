import { Component, OnInit, Input } from '@angular/core';
import { IParam_SourceName_PascalItem } from '../Param_SourceName_Kebab.model';

@Component({
  selector: 'app-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.css']
})
export class GridItemComponent implements OnInit {
  @Input() key: number;
  @Input() gridItem: IParam_SourceName_PascalItem;

  constructor() {}

  ngOnInit() {}
}
