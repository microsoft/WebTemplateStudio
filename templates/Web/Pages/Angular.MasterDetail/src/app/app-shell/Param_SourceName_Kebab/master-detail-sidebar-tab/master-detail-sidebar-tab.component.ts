import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ISampleOrder } from '../master-detail.model';

@Component({
  selector: 'app-master-detail-sidebar-tab',
  templateUrl: './master-detail-sidebar-tab.component.html',
  styleUrls: ['./master-detail-sidebar-tab.component.css']
})
export class MasterDetailSidebarTabComponent {
  @Input() sampleOrder: ISampleOrder;
  @Output() itemClick = new EventEmitter<ISampleOrder>();

  selectSampleOrder() {
    this.itemClick.emit();
  }
}
