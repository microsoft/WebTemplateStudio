import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.css']
})
export class ListFormComponent implements OnInit {
  listForm: FormGroup;

  @Output() inputText = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.listForm = new FormGroup({
      content: new FormControl('')
    });
  }

  get content() { return this.listForm.get('content'); }

  onSubmit() {
    this.inputText.emit(this.listForm.get('content').value);
    this.listForm.reset();
  }
}
