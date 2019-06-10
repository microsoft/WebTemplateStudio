import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-warning-message',
  templateUrl: './warning-message.component.html',
  styleUrls: ['./warning-message.component.css']
})
export class WarningMessageComponent implements OnInit {

  open = false;
  @Input() text = '';
  @Output() WarningMessageOpenEventEmitter = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onWarningClose() {
    this.text = '';
    this.open = false;
    this.WarningMessageOpenEventEmitter.emit(this.open);
  }
}
