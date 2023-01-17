import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AYN_BOOLEAN_INPUT_VALUE } from '../injection/boolean-input-value.injection';

@Component({
  selector: 'ayn-checkbox',
  template: `<span class="checkbox" [ngClass]="{'checkbox-checked': value, 'checkbox-unchecked': !value}" (click)="handleClick();"></span>`,
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: AYN_BOOLEAN_INPUT_VALUE,
      useExisting: forwardRef(() => CheckboxComponent)
    }
  ]
})
export class CheckboxComponent implements OnInit, OnDestroy {

  // TODO: Provide and implement ControlValueAccessor.
  constructor() { }

  @Input()
  value: boolean = false;

  @Output()
  valueChange = new EventEmitter<boolean>();

  isDisabled: boolean = false;

  ngOnInit(): void {
  }

  handleClick() {
    if (!this.isDisabled) {
      this.value = !this.value;
      this.valueChange.emit(this.value);
    }
  }

  ngOnDestroy(): void {
    this.valueChange.complete();
  }

}
