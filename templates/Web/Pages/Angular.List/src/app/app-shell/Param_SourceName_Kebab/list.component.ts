import { Component, OnInit, eventEmitterLoad } from '@angular/core';

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
  eventEmitterLoad = new EventEmitter<Object>();

  constructor(private listService: ListService) {}

  ngOnInit() {
    this.listItems$ = Observable.create((observer) =>{
      this.eventEmitterLoad.subscribe((list:IListItem[])=>{
        observer.next(list);
      });
    });
    this.loadItems();
  }

  loadItems(){
    this.listService.getListItems().subscribe(
      (list:IListItem[])=>{this.eventEmitterLoad.emit(list)},
      error => {
        this.warningMessageOpen = true;
        this.warningMessageText = `Request to add list item failed: ${error}`;
      }
    );
  }

  addItem(inputText: string) {
    this.listService.addListItem(inputText).subscribe(
      ()=>{this.loadItems()},
      error => {
        this.warningMessageOpen = true;
        this.warningMessageText = `Request to add list item failed: ${error}`;
      }
    );
  }

  deleteItem(id: number) {
    this.listService.deleteListItem(id).subscribe(
      ()=>{this.loadItems()},
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
