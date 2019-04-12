import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html'
})
export class ListItemComponent implements OnInit {
  @Input() _id : number;
  @Input() text: string;
  @Output() deleteTextEventEmitter = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  onDeleteListItem(){
    this.deleteTextEventEmitter.emit(this._id);
  }

}

export interface IListItem{
  _id: number;
  text: string;
}
