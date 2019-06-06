import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid-box',
  templateUrl: './grid-box.component.html',
  styleUrls: ['./grid-box.component.css']
})
export class GridBoxComponent implements OnInit {

  @Input() key: number;
  @Input() header: string;
  @Input() description: string;
  @Input() image: string;

  constructor() { }

  ngOnInit() {
  }

}

export interface IGridTextItem {
  description: string;
  header: string;
  id: number;
}
