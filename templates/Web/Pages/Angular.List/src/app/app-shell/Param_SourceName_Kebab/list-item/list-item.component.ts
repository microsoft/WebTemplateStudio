import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  // tslint:disable-next-line
  @Input() _id: number;
  @Input() text: string;
  @Output() deleteText = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  onDeleteListItem() {
    this.deleteText.emit(this._id);
  }

}
