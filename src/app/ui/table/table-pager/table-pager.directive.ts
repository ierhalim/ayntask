import { Directive, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

@Directive({
  selector: '[aynTablePager]'
})
export class TablePagerDirective implements OnDestroy {

  constructor() { }

  @Input()
  totalDataCount: number = 0;

  pageSize: number = 0;


  @Input()
  currentPage: number = 0;

  @Output()
  currentPageChange = new EventEmitter<number>();

  get nextPageAvaible(): boolean {
    return this.totalDataCount > (this.pageSize * this.currentPage);
  }

  get prevPageAvaible(): boolean {
    return this.currentPage > 1;
  }

  gotoNextPage() {
    this.currentPage++;
    this.currentPageChange.emit(this.currentPage);
   }

  gotoPrevPage() { 
    this.currentPage--;
    this.currentPageChange.emit(this.currentPage);
  }

  ngOnDestroy(): void {
    this.currentPageChange.complete();
  }

}
