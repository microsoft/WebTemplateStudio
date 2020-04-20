import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAngularListItem } from '../Param_SourceName_Kebab.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  @Input() _id: number;
  @Input() listItem: IAngularListItem;
  @Output() deleteItem = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  deleteItemFn() {
    this.deleteItem.emit(this._id);
  }
}
