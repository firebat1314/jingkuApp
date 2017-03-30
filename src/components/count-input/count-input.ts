import { Component, Input, Output, EventEmitter } from '@angular/core';

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

  @Input() value = 0;
  @Input() lock = false;
  @Output() updateNumberI: EventEmitter<number> = new EventEmitter();
  constructor() {
    console.log('Hello CountInput Component');
  }
  increase() {
    if (this.lock) {
      return;
    }
    this.value++;
    this.updateNumberI.emit(this.value);
  }
  reduce() {
    if (this.value <= 0) {
      return;
    }
    this.value--;
    this.updateNumberI.emit(this.value);
  }
  inputEvent(){
    this.updateNumberI.emit(this.value);
  }
}
