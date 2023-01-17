import { Directive, Host, Inject, Input, OnDestroy, OnInit, Self } from "@angular/core";
import { Subscription } from "rxjs";
import { AYN_BOOLEAN_INPUT_VALUE, BooleanInputValue } from "../../injection/boolean-input-value.injection";
import { TableSelectableDirective } from "./table-selectable.directive";

@Directive({
    selector: '[aynTableSelectItemInput]'
})
export class TableSelectItemInputDirective<TTableCollectionType> implements OnInit, OnDestroy {

    constructor(
        @Host() private readonly tableSelectable: TableSelectableDirective<TTableCollectionType>,
        @Self() @Inject(AYN_BOOLEAN_INPUT_VALUE) private readonly selectInput: BooleanInputValue
    ) { }

    valueChangeSub?: Subscription;

    itemSelectedSub?: Subscription;

    itemUnSelectedSub?: Subscription;

    @Input('aynTableSelectItemInput')
    selectableItem?: TTableCollectionType;

    ngOnInit(): void {
        this.valueChangeSub = this.selectInput.valueChange.subscribe((isSelected) => {
            if (!this.selectableItem) {
                throw new Error("aynTableSelectItemInput requires the item to manage selection.");
            }
            if (isSelected) {
                this.tableSelectable.select(this.selectableItem);
            } else {
                this.tableSelectable.unSelect(this.selectableItem);
            }
        });

      this.itemSelectedSub =  this.tableSelectable.itemSelected.subscribe((selectedItem: TTableCollectionType) => {
            if (selectedItem === this.selectableItem) {
                this.selectInput.value = true;
            }
        });
    
        this.itemUnSelectedSub = this.tableSelectable.itemUnSelected.subscribe((unSelectedItem: TTableCollectionType) => { 
            if (unSelectedItem === this.selectableItem) { 
                this.selectInput.value = false;
            }
        });

    }

    ngOnDestroy(): void {
        if (!!this.valueChangeSub) {
            this.valueChangeSub.unsubscribe();
        }
        if (!!this.itemSelectedSub) { 
            this.itemSelectedSub.unsubscribe();
        }
        if (!!this.itemUnSelectedSub) { 
            this.itemUnSelectedSub.unsubscribe();
        }
    }
}