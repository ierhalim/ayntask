import { Component, forwardRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

// https://www.w3schools.com/howto/howto_css_switch.asp
@Component({
  selector: 'ayn-toggle-switch',
  standalone: true,
  template: `
  <span class="switch" [ngClass]="{'toggle-active':value, 'toggle-passive':value, 'toggle-disabled': isDisabled}" (click)="handleClick()">
    <div class="slider"></div>
  </span>
    `,
  imports: [CommonModule],
  styleUrls: ['./toggle-switch.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleSwitchComponent),
    multi: true
  }]
})
export class ToggleSwitchComponent implements OnInit {

  constructor() { }

  value = false;

  isDisabled = false;

  ngOnInit(): void {
  }

  propageteOnChange(newValue: boolean) { }

  propagateOnTouchhed() { }


  writeValue(obj: boolean): void {
    this.value = obj;
  }
  registerOnChange(fn: (newValue: boolean) => void): void {
    this.propageteOnChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.propagateOnTouchhed = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }


  handleClick() {
    if (!this.isDisabled) {
      this.value = !this.value;
      this.propagateOnTouchhed();
      this.propageteOnChange(this.value);
    }
  }


}
