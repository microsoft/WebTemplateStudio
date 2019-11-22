import { Component, OnInit } from '@angular/core';

import { ListService } from './list.service';
import { IListItem } from './list.model';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listItems$: Observable<IListItem[]>;
  warningMessageText = 'Request to get list items failed:';
  warningMessageOpen = false;

  constructor(private listService: ListService) {}

  ngOnInit() {
    this.listItems$ = this.listService.getListItems();
    this.listItems$.pipe(catchError((error) => {
      this.warningMessageText = `Request to get list failed: ${error}`;
      this.warningMessageOpen = true;
      return of(null);
    })).subscribe();
  }

  addItem(inputText: string) {
    this.listService.addListItem(inputText).subscribe(
      (response: IListItem) => {
        this.listItems$ = this.listItems$.pipe(map(_listItems => _listItems));
      },
      error => {
        this.warningMessageOpen = true;
        this.warningMessageText = `Request to add list item failed: ${error}`;
      }
    );
  }

  deleteItem(id: number) {
    this.listService.deleteListItem(id).subscribe(
      (response: IListItem) => {
        this.listItems$ = this.listItems$.pipe(map(_listItems => {
          return _listItems.filter(item => item._id !== response._id);
        }));
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
