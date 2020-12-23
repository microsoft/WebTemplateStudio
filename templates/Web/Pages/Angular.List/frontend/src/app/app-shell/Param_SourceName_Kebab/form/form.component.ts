import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  listForm: FormGroup;

  @Output() inputText = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.listForm = new FormGroup({
      content: new FormControl('')
    });
  }

  get content(): AbstractControl {
    return this.listForm.get('content');
  }

  onSubmit(): void {
    this.inputText.emit(this.listForm.get('content').value);
    this.listForm.reset();
  }
}
