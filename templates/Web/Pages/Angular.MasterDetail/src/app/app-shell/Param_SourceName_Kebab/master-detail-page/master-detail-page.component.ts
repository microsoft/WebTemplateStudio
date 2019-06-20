import { Component, OnInit, Input } from '@angular/core';
import { IMasterDetailText } from '../master-detail.service';

@Component({
  selector: 'app-master-detail-page',
  templateUrl: './master-detail-page.component.html',
  styleUrls: ['./master-detail-page.component.css']
})
export class MasterDetailPageComponent implements OnInit {

  @Input() textSampleData: IMasterDetailText;
  constructor() { }

  ngOnInit() {
    this.textSampleData = {
      title: '',
      status: '',
      orderDate: '',
      shipTo: '',
      orderTotal: 0.0,
      longDescription: '',
      shortDescription: '',
      id: 0
    };
  }

}
