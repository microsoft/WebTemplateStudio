import { Component, OnInit } from '@angular/core';
import { IListItem } from './ListItem/list-item';
import { ListService } from './list.service';
import { CONSTANTS } from '../../../constants';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listItems: IListItem[] = [];
  WarningMessageText = CONSTANTS.ERROR_MESSAGE.LIST_GET;
  WarningMessageOpen = false;
  constructor(private listService: ListService) { }

  ngOnInit() {
    this.listService.getListItems().subscribe(
      response => {
        this.listItems = response;
      },
      error => {
        this.WarningMessageOpen = true;
        this.WarningMessageText = `${CONSTANTS.ERROR_MESSAGE.LIST_GET} ${error}`;
      }
    );
  }

  handleAddListItem(inputText: string) {
    if (!inputText) {
      this.WarningMessageOpen = true,
      this.WarningMessageText = CONSTANTS.ERROR_MESSAGE.LIST_EMPTY_MESSAGE;
      return;
    }
    this.listService.addListItem(inputText).subscribe(
      (response) => {
        this.listItems.splice(0, 0, response);
      },
      error => {
        this.WarningMessageOpen = true;
        this.WarningMessageText = `${CONSTANTS.ERROR_MESSAGE.LIST_ADD} ${error}`;
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
        this.WarningMessageText = `${CONSTANTS.ERROR_MESSAGE.LIST_DELETE} ${error}`;
      }
    );
  }
  handleWarningClose(open: boolean) {
    this.WarningMessageOpen = open;
    this.WarningMessageText = '';
  }
}
