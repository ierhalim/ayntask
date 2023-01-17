import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';


const exportedDeclarataions = [
  TableComponent
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
