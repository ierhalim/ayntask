import { Directive, ElementRef, EventEmitter, HostListener, OnDestroy, Output } from '@angular/core';

@Directive({
  selector: '[aynDelayedInput]',
  standalone: true
})
export class DelayedInputDirective implements OnDestroy {

  constructor(
    private readonly elementRef: ElementRef<HTMLInputElement>
  ) { }

  private activeTimeOut: NodeJS.Timeout | null = null;

  // Instead of string should emit a DelayedInput event object.
  @Output('aynDelayedInput')
  delayedInputDetected = new EventEmitter<string>();

  @Output()
  emptyInput = new EventEmitter<string>();
  
  @HostListener('input')
  handleKeyDown() {
    if (!!this.activeTimeOut) {
      clearTimeout(this.activeTimeOut);
      this.activeTimeOut = null;
    }
    this.activeTimeOut = setTimeout(() => {
      const inputValue = this.elementRef.nativeElement.value;
      if (inputValue.length >= 3 && inputValue.match(/^[\p{L}\p{N}]*$/u)) {
        this.delayedInputDetected.emit(inputValue);
      } else if (inputValue.length === 0) { 
        this.emptyInput.emit();
      }
    }, 300);
  }

  ngOnDestroy(): void {
    this.delayedInputDetected.complete();
    this.emptyInput.complete();
  }

}
