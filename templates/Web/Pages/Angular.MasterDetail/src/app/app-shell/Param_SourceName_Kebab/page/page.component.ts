import { Component, OnInit, Input } from '@angular/core';
import { ISampleOrder } from '../Param_SourceName_Kebab.model';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  @Input() sampleOrder: ISampleOrder;

  constructor() {}

  ngOnInit() {}
}
