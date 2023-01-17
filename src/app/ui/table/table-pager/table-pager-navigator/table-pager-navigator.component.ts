import { Component } from '@angular/core';
import { TablePagerDirective } from '../table-pager.directive';

@Component({
  selector: 'ayn-table-pager-navigator',
  template: `
      <span class="pager-navigator">
        <button 
              type="button" 
              class="ayn-button pager-navigator-button ayn-button-outline pager-navigator-button-prev"
              [ngClass]="{'ayn-button-primary': tablePager.prevPageAvaible, 'ayn-button-default': !tablePager.prevPageAvaible}"
              (click)="handlePrevPageClick()"
              >
            <i class="fa-solid fa-angle-left"></i>
        </button>
        <button 
          type="button" 
          class="ayn-button  pager-navigator-button pager-navigator-button-next ayn-button-outline"
          [ngClass]="{'ayn-button-primary': tablePager.nextPageAvaible, 'ayn-button-default': !tablePager.nextPageAvaible}"
          (click)="handleNextPageClick()"
          >
          <i class="fa-solid fa-angle-right"></i>
        </button>
      </span>
    `,
  styleUrls: ['./table-pager-navigator.component.scss']
})
export class TablePagerNavigatorComponent{

  constructor(
    public readonly tablePager: TablePagerDirective
  ) { }
  handlePrevPageClick() { 
    if (this.tablePager.prevPageAvaible) { 
      this.tablePager.gotoPrevPage();
    }
  }

  handleNextPageClick() {
    if (this.tablePager.nextPageAvaible) { 
      this.tablePager.gotoNextPage();
    }
  }
}
