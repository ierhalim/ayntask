import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'microCurrency',
  standalone: true
})
export class MicroCurrencyPipe implements PipeTransform {

  constructor(
    private readonly currencyPipe: CurrencyPipe
  ) { }

  transform(value: number, currency: string): string | null {
    return this.currencyPipe.transform(
      (value / 100000), currency
    );
  }

}
