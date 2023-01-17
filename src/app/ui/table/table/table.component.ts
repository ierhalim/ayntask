import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'ayn-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<TCollectionType> {

  constructor() { }

  private _value: Array<TCollectionType> | null = new Array<TCollectionType>();

  @Input()
  set value(val: Array<TCollectionType> | null) {
    if (!!val) {
      if (!(val instanceof Array)) {
        throw new Error("Table value only support arrays.");
      }
      this._value = val;
    } else {
      this._value = new Array<TCollectionType>();
    }
  }

  get value(): Array<TCollectionType> | null {
    return this._value;
  }

  // TODO: Instead of Content child get template with a custom directive, with that we can support multiple templates.
  @ContentChild(TemplateRef<any>)
  itemTemplate: TemplateRef<any> | null = null;

}
