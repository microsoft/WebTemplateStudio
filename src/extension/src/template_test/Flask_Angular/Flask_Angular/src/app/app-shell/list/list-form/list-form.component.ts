﻿import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html'
})
export class ListFormComponent implements OnInit {
  textField: string;
  @Output() inputText = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onAddListItem() {
    this.inputText.emit(this.textField);
    this.textField = '';
  }
}
