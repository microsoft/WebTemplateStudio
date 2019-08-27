import { Component, OnInit } from '@angular/core';

import { ListService } from './list.service';
import { IListItem } from './list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  listItems: IListItem[] = [];
  warningMessageText = 'Request to get list items failed:';
  warningMessageOpen = false;

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.listService.getListItems().subscribe(
      (response: IListItem[]) => {
        this.listItems = response;
      },
      error => {
        this.warningMessageOpen = true;
        this.warningMessageText = `Request to get list items failed: ${error}`;
      }
    );
  }

  handleAddListItem(inputText: string) {
    this.listService.addListItem(inputText).subscribe(
      (response: IListItem) => {
        this.listItems.splice(0, 0, response);
      },
      error => {
        this.warningMessageOpen = true;
        this.warningMessageText = `Request to add list item failed: ${error}`;
      }
    );
  }

  handleDeleteListItem(id: number) {
    this.listService.deleteListItem(id).subscribe(
      (response: IListItem) => {
        this.listItems = this.listItems.filter(item => item._id !== response._id);
      },
      error => {
        this.warningMessageOpen = true;
        this.warningMessageText = `Request to delete list item failed: ${error}`;
      }
    );
  }

  handleWarningClose(open: boolean) {
    this.warningMessageOpen = open;
    this.warningMessageText = '';
  }
}
