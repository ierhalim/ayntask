import { Component, EventEmitter, Host, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TablePagerDirective } from '../table-pager.directive';

@Component({
  selector: 'ayn-table-pager-page-size-selector',
  template: `
      <select [value]="pageSize" class="ayn-select ayn-select-rounded" (change)="handleSelectionChange($event)">
        <option *ngFor="let item of avaibleSizes" [value]="item" >{{item}}</option>
      </select>
  `,
})
export class TablePagerPageSizeSelectorComponent implements OnInit, OnDestroy {


  private readonly _defaultPageSize = 5;

  constructor(
   @Host()  private readonly tablePager: TablePagerDirective
  ) { 
    tablePager.pageSize = this._defaultPageSize;
  }

  private _pageSize: number = this._defaultPageSize;

  get pageSize(): number { 
    return this._pageSize;
  }

  @Input()
  set pageSize(value: number) { 
    this._pageSize = value;
    this.tablePager.pageSize = value;
  }

  @Output()
  pageSizeChange = new EventEmitter<number>();

  @Input()
  avaibleSizes = [5, 10, 20];

  ngOnInit(): void {
  }

  handleSelectionChange(event: Event) {
    this.pageSize = parseInt((event.target as HTMLSelectElement).value);
    this.pageSizeChange.emit(this.pageSize);
  }

  ngOnDestroy(): void {
    this.pageSizeChange.complete();
  }

}
