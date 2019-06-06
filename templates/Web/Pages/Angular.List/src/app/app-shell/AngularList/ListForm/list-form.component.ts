import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html'
})
export class ListFormComponent implements OnInit {
  textField: string;
  @Output() inputTextEventEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onAddListItem() {
    this.inputTextEventEmitter.emit(this.textField);
    this.textField = '';
  }
}
