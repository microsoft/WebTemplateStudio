import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-master-detail-sidebar-tab',
  templateUrl: './master-detail-sidebar-tab.component.html',
  styleUrls: ['../master-detail.component.css']
})
export class MasterDetailSidebarTabComponent implements OnInit {

  @Input() tabText: string;
  @Input() index: number;
  @Input() key: number;
  @Output() displayTabClickEventEmitter = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onDisplayTabClick() {
    this.displayTabClickEventEmitter.emit(this.index);
  }
}
