import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { TablePagerNavigatorComponent } from './table-pager/table-pager-navigator/table-pager-navigator.component';
import { TablePagerPageSizeSelectorComponent } from './table-pager/table-pager-page-size-selector/table-pager-page-size-selector.component';
import { TablePagerDirective } from './table-pager/table-pager.directive';


const exportedDeclarataions = [
  TableComponent,
  TablePagerNavigatorComponent,
  TablePagerPageSizeSelectorComponent,
  TablePagerDirective
];

@NgModule({
  declarations: [
    ...exportedDeclarataions
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...exportedDeclarataions
  ]
})
export class TableModule { }
