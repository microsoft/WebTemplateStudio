import { Component, OnInit } from '@angular/core';

import { ListService, IListItem } from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listItems: IListItem[] = [];
  WarningMessageText = 'Request to get list items failed:';
  WarningMessageOpen = false;
  constructor(private listService: ListService) { }

  ngOnInit() {
    this.listService.getListItems().subscribe(
      response => {
        this.listItems = response;
      },
      error => {
        this.WarningMessageOpen = true;
        this.WarningMessageText = `Request to get list items failed: ${error}`;
      }
    );
  }

  handleAddListItem(inputText: string) {
    this.listService.addListItem(inputText).subscribe(
      (response) => {
        this.listItems.splice(0, 0, response);
      },
      error => {
        this.WarningMessageOpen = true;
        this.WarningMessageText = `Request to add list item failed: ${error}`;
      }
    );
  }

  handleDeleteListItem(id: number) {

    this.listService.deleteListItem(id).subscribe(
      response => {
        this.listItems = this.listItems.filter(item => item._id !== response._id);
      },
      error => {
        this.WarningMessageOpen = true;
        this.WarningMessageText = `Request to delete list item failed: ${error}`;
      }
    );
  }
  handleWarningClose(open: boolean) {
    this.WarningMessageOpen = open;
    this.WarningMessageText = '';
  }
}
