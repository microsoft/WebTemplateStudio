import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-master-detail-sidebar-tab',
  templateUrl: './master-detail-sidebar-tab.component.html',
  styleUrls: ['./master-detail-sidebar-tab.component.css']
})
export class MasterDetailSidebarTabComponent implements OnInit {

  @Input() tabText: string;
  @Input() image: string;
  @Input() index: number;
  @Input() key: number;
  @Output() displayTabClick = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onDisplayTabClick() {
    this.displayTabClick.emit(this.index);
  }
}
