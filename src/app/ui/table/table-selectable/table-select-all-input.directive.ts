import { Directive, Host, Inject, OnDestroy, OnInit, Self } from '@angular/core';
import { Subscription } from 'rxjs';
import { AYN_BOOLEAN_INPUT_VALUE, BooleanInputValue } from "../../injection/boolean-input-value.injection";
import { TableSelectableDirective } from './table-selectable.directive';

@Directive({
  selector: '[aynTableSelectAllInput]'
})
export class TableSelectAllInputDirective<TTableCollectionType> implements OnInit, OnDestroy {

  constructor(
    @Host() private readonly tableSelectable: TableSelectableDirective<TTableCollectionType>,
    @Self() @Inject(AYN_BOOLEAN_INPUT_VALUE) private readonly boolenInput: BooleanInputValue
  ) { }

  private valueChangeSub?: Subscription;

  private childSelectedSub?: Subscription;

  private childUnSelectedSub?: Subscription;


  ngOnInit(): void {
    this.handleValueChanges();
  }

  private handleValueChanges() {
    this.valueChangeSub = this.boolenInput.valueChange.subscribe((isSelected: boolean) => {
      if (isSelected) {
        this.tableSelectable.selectAll();
      } else {
        this.tableSelectable.unSelectAll();
      }
    });
  }

  ngOnDestroy(): void {
    if (!!this.valueChangeSub) {
      this.valueChangeSub.unsubscribe();
    }
    if (!!this.childSelectedSub) { 
      this.childSelectedSub?.unsubscribe();
    }
    if (!!this.childUnSelectedSub) { 
      this.childUnSelectedSub.unsubscribe();
    }
  }

}
