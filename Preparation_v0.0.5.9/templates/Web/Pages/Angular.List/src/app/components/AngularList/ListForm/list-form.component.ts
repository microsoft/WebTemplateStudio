import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html'
})
export class ListFormComponent implements OnInit {
  _textField: string;
  @Output() inputTextEventEmitter = new EventEmitter<string>();
  get textField() {
      return this._textField;
  }
  set textField(textInput) {
      this._textField = textInput;
  }
  constructor() { }

  ngOnInit() {
  }

  onAddListItem(){
    this.inputTextEventEmitter.emit(this.textField);
    this.textField = '';
  }
}
