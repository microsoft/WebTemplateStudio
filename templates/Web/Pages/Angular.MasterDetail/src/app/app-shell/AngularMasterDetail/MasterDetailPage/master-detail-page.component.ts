import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-master-detail-page',
  templateUrl: './master-detail-page.component.html',
  styleUrls: ['../master-detail.component.css']
})
export class MasterDetailPageComponent implements OnInit {

  @Input() textSampleData: IMasterDetailText;
  constructor() { }

  ngOnInit() {
  }

}
export interface IMasterDetailText{
  paragraph: string;
  title: string;
  tabName: string;
  id: number;
}
