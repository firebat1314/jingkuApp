import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';

/*
  Generated class for the CountInput component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
   selector: 'count-input',
   templateUrl: 'count-input.html',
   host: {
      '[class.has_border]': 'hasBorder',
   }
})
export class CountInputComponent {

   @Input() lock: boolean = false;
   @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();


   _minValue: number = 0;
   @Input() set minValue(minValue: number) {
      if (!minValue) { return };
      this._minValue = !isNaN(minValue) ? +minValue : 0;
   };
   get minValue() {
      return this._minValue;
   }

   _value: number = 0;
   @Input() set value(value: number) {
      this._value = !isNaN(value) ? +value : this.minValue;
   };
   get value(): number {
      return this._value;
   }

   _maxValue: number;
   @Input() set maxValue(maxValue: number) {
      if (!maxValue) { return };
      this._maxValue = !isNaN(maxValue) ? +maxValue : null;
   };
   get maxValue() {
      return this._maxValue;
   }

   _rank = 1;
   @Input() set rank(rank) {
      if (!rank) { return };
      this._rank = !isNaN(rank) ? +rank : 1;
   }
   get rank() {
      return this._rank
   }

   @Input() hasBorder = false;


   disabled: boolean = false;//禁用输入框手动输入
   inputEle: HTMLInputElement;

   constructor(
      private element: ElementRef,
   ) {
      // console.log('Hello CountInput Component');
   }
   ngOnInit() {
      if (this.rank !== 1 || this.maxValue <= 0 || this.maxValue == this.minValue) this.disabled = true;
   }
   reduce() {
      this.valueChange.emit(this.value -= this.rank);
   }
   increase() {
      this.valueChange.emit(this.value += this.rank);
   }
   inputEvent() {
      this.valueChange.emit(this.value);
   }
   input(value) {
      if (this.maxValue) {
         if (this.value >= this.maxValue) {
            setTimeout(() => {
               this.value = +this.maxValue;
            }, 0);
         } else if (this.value <= 0) {
            setTimeout(() => {
               this.value = +this.minValue;
            }, 0);
         } else {
            setTimeout(() => {
               this.value = +this.value;
            }, 0);
         }
      }
   }
}