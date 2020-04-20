import { Component, OnInit } from '@angular/core';

import { AngularListService } from './Param_SourceName_Kebab.service';
import { IAngularListItem } from './Param_SourceName_Kebab.model';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './Param_SourceName_Kebab.component.html',
  styleUrls: ['./Param_SourceName_Kebab.component.css']
})
export class AngularListComponent implements OnInit {
  listItems$: Observable<IAngularListItem[]> = new Observable();
  private dataSource: Subject<IAngularListItem[]> = new Subject();
  warningMessageText = '';
  warningMessageOpen = false;

  constructor(private listService: AngularListService) {}

  ngOnInit() {
    this.listItems$ = this.dataSource.asObservable();
    this.loadItems();
  }

  loadItems() {
    this.listService.getListItems().subscribe(
      (listItem: IAngularListItem[]) => this.dataSource.next(listItem),
      error => this.handleError(`Request to get list items failed: ${error}`)
    );
  }

  addItem(inputText: string) {
    this.listService.addListItem(inputText).subscribe(
      () => this.loadItems(), error => this.handleError(`Request to add item failed: ${error}`)
    );
  }

  deleteItem(id: number) {
    this.listService.deleteListItem(id).subscribe(
      () => this.loadItems(), error => this.handleError(`Request to delete item failed: ${error}`)
    );
  }

  handleWarningClose(open: boolean) {
    this.warningMessageOpen = open;
    this.warningMessageText = '';
  }

  private handleError(warningMessageText: string) {
    this.warningMessageOpen = true;
    this.warningMessageText = warningMessageText;
  }
}
