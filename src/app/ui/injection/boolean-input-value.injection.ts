import { EventEmitter, InjectionToken } from "@angular/core";

export const AYN_BOOLEAN_INPUT_VALUE = new InjectionToken<string>('AynBooleanInputValue');

export interface BooleanInputValue { 
    value: boolean;
    valueChange: EventEmitter<boolean>;
}

