import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Native } from "../../providers/native";

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
    this._minValue = minValue;
  };
  get minValue() {
    return Number(this._minValue);
  }

  _value: number = 0;
  @Input() set value(value: number) {
    this._value = Number(value) || this.minValue;
  };
  get value(): number {
    return Number(this._value);
  }

  _maxValue: number;
  @Input() set maxValue(maxValue: number) {
    this._maxValue = Number(maxValue);
  };
  get maxValue() {
    return Number(this._maxValue);
  }

  _rank = 1;
  @Input() set rank(rank) {
    this._rank = Number(rank) || this._rank;
  }
  get rank() {
    return Number(this._rank)
  }


  disabled: boolean = false;
  constructor(
    private native: Native,
    private element: ElementRef,
  ) {
    // console.log('Hello CountInput Component');
  }
  ngOnInit() {
    if (this.rank !== 1) this.disabled = true;
  }
  increase() {
    if (this.maxValue && (this.maxValue - this.value) < this.rank) {
      this.native.showToast('最多选择' + this.maxValue + '件');
      this.element.nativeElement.getElementsByTagName('input')[0].value = this.value;
      return;
    }
    this.valueChange.emit(this.value += this.rank);
  }
  reduce() {
    if (this.value <= this.minValue) {
      return;
    }
    this.valueChange.emit(this.value -= this.rank);
  }

  inputEvent() {
    if (this.maxValue && (this.value >= this.maxValue)) {
      this.native.showToast('最多选择' + this.maxValue + '件');
      this.element.nativeElement.getElementsByTagName('input')[0].value = this.maxValue;
      this.value = this.maxValue;
    } else if (!this.value) {
      this.element.nativeElement.getElementsByTagName('input')[0].value = 0;
    }
    this.valueChange.emit(this.value);
  }
}