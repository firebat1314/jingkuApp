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

  @Input() value: number = 0;
  @Input() defaultValue: number = 0;
  @Input() maxValue: number;
  @Input() lock: boolean = false;
  @Output() updateNumberI: EventEmitter<number> = new EventEmitter();

  constructor(
    private native: Native,
    private element: ElementRef,
  ) {
    console.log('Hello CountInput Component');
  }
  increase() {
    if (this.lock) {
      return;
    } else if (this.maxValue && this.value >= this.maxValue) {
      this.native.showToast('最多选择' + this.maxValue + '件')
      return;
    }
    this.updateNumberI.emit(++this.value);
  }
  reduce() {
    if (this.value <= this.defaultValue) {
      return;
    }
    this.updateNumberI.emit(--this.value);
  }
  inputEvent(value) {
    if (this.maxValue && (this.value >= this.maxValue)) {
      this.native.showToast('最多选择' + this.maxValue + '件')
      this.element.nativeElement.getElementsByTagName('input')[0].value = this.maxValue;
      this.value = this.maxValue;
    }
    console.log(this.value, this.maxValue, this.value >= this.maxValue)
    this.updateNumberI.emit(this.value);
  }
}