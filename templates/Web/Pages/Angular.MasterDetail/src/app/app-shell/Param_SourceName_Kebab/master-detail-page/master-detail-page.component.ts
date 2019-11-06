import { Component, OnInit, Input } from '@angular/core';
import { ISampleOrder } from '../master-detail.model';

@Component({
  selector: 'app-master-detail-page',
  templateUrl: './master-detail-page.component.html',
  styleUrls: ['./master-detail-page.component.css']
})
export class MasterDetailPageComponent {
  @Input() sampleOrder: ISampleOrder;
}
