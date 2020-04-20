import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ISampleOrder } from '../Param_SourceName_Kebab.model';

@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.css']
})
export class MasterList implements OnInit {
  @Input() sampleOrder: ISampleOrder;
  @Output() itemClick = new EventEmitter<ISampleOrder>();

  constructor() {}

  ngOnInit() {}

  selectSampleOrder() {
    this.itemClick.emit();
  }
}
