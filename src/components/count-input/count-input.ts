import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';

/*
  Generated class for the CountInput component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
   selector: 'count-input',
   templateUrl: 'count-input.html'
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
      if (!value) { return };
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
   ngAfterViewInit() {
      this.inputEle = this.element.nativeElement.getElementsByTagName('input')[0];
   }
   reduce() {
      this.valueChange.emit(this.value -= this.rank);
   }
   increase() {
      /* if (this.maxValue && (this.maxValue - this.value) < this.rank) {
        this.native.showToast('最多选择' + this.maxValue + '件');
        this.inputEle.value = this.value;
        return;
      } */
      this.valueChange.emit(this.value += this.rank);
   }
   inputEvent() {
      /* if ((this.maxValue || this.maxValue==0) && (this.value >= this.maxValue)) {
        this.native.showToast('最多选择' + this.maxValue + '件');
        this.inputEle.value = this.maxValue;
        this.value = this.maxValue;
      } else  */
      /* if (!this.value) {
        this.inputEle.value = 0;
      } */
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