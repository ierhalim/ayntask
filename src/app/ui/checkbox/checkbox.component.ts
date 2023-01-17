import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ayn-checkbox',
  template: `<span class="checkbox" [ngClass]="{'checkbox-checked': value, 'checkbox-unchecked': !value}" (click)="handleClick();"></span>`,
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./checkbox.component.scss']
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
