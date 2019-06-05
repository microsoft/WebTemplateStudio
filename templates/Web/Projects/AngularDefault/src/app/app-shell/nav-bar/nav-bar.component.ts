import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: "app-header",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class HeaderComponent implements OnInit {
  skipLinkPath: string;
  constructor(private location: Location) {}

  ngOnInit() {
    this.skipLinkPath = `${this.location.path()}#mainContent`;
  }
}
