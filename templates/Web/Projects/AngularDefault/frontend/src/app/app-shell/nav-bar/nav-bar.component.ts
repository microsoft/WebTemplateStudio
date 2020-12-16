import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  skipLinkPath: string;
  constructor(private location: Location) { }

  ngOnInit(): void {
    this.skipLinkPath = `${this.location.path()}#mainContent`;
  }
}
