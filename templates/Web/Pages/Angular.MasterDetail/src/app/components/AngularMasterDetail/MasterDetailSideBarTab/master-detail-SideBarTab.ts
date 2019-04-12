import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-master-detail-sidebartab',
  templateUrl: './master-detail-sidebartab.component.html',
  styleUrls: ['../master-detail.component.css']
})
export class MasterDetailSideBarTabComponent implements OnInit {

  @Input() tabText: string;
  @Input() image: string;
  @Input() index: number;
  @Input() key: number;
  @Output() onDisplayTabClickEventEmitter = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onDisplayTabClick(){
    this.onDisplayTabClickEventEmitter.emit(this.index);
  }
}
