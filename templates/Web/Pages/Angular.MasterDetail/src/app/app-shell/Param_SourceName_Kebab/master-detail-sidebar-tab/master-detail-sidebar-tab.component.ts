import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ISampleOrder } from '../Param_SourceName_Kebab.model';

@Component({
  selector: 'app-master-detail-sidebar-tab',
  templateUrl: './master-detail-sidebar-tab.component.html',
  styleUrls: ['./master-detail-sidebar-tab.component.css']
})
export class MasterDetailSidebarTabComponent implements OnInit {
  @Input() sampleOrder: ISampleOrder;
  @Output() itemClick = new EventEmitter<ISampleOrder>();

  constructor() {}

  ngOnInit() {}

  selectSampleOrder() {
    this.itemClick.emit();
  }
}
