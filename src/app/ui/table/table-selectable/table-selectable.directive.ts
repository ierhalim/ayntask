import { Directive, EventEmitter, Input, OnDestroy, Output, Self } from '@angular/core';
import { TableComponent } from '../table/table.component';

@Directive({
  selector: '[aynTableSelectable]'
})
export class TableSelectableDirective<TCollectionType> implements OnDestroy {

  constructor(
    // This directive can be modified to work with every component that holds collection.
    @Self() private readonly table: TableComponent<TCollectionType>
  ) { }


  @Input()
  selectedItems: Array<TCollectionType> = new Array<TCollectionType>();

  @Output()
  itemSelected = new EventEmitter<TCollectionType>();

  @Output()
  itemUnSelected = new EventEmitter<TCollectionType>();

  selectAll() {
    if (!!this.table.value) {
      for (let item of this.table.value) {
        if (this.selectedItems.indexOf(item) === -1) {
          this.itemSelected.emit(item);
          this.selectedItems.push(item);
        }
      }
    }
  }

  unSelectAll() {
    if (!!this.selectedItems) { 
      for (let item of this.selectedItems) { 
        this.itemUnSelected.emit(item);
      }
    }
    this.selectedItems = [];
  }

  select(item: TCollectionType) {
    this.selectedItems.push(item);
    this.itemSelected.emit(item);
  }

  unSelect(item: TCollectionType) {
    const idx = this.selectedItems.indexOf(item);
    if (idx > -1) { 
      this.selectedItems.splice(idx, 1);
      this.itemUnSelected.emit(item);
    }
   }


  ngOnDestroy(): void {
    this.itemSelected.complete();
    this.itemUnSelected.complete();
  }


}
