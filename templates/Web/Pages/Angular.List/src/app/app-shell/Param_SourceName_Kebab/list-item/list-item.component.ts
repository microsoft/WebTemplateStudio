import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IParam_SourceName_PascalItem } from '../Param_SourceName_Kebab.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  @Input() id: string;
  @Input() listItem: IParam_SourceName_PascalItem;
  @Output() deleteItem = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  deleteItemFn() {
    this.deleteItem.emit(this.id);
  }
}
