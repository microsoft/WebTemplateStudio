import { Component, OnInit, Input } from '@angular/core';
import { ISampleOrder } from '../Param_SourceName_Kebab.model';

@Component({
  selector: 'app-page',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @Input() sampleOrder: ISampleOrder;

  constructor() {}

  ngOnInit() {}
}
