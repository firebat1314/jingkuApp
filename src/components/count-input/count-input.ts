import { Component,Input,Output,EventEmitter } from '@angular/core';

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
 @Output() updateNumberI:EventEmitter<number> = new EventEmitter();
  constructor() {
    console.log('Hello CountInput Component');
  }
  increase(){
    this.value++
    this.updateNumberI.emit(this.value);
  }
  reduce(){
    this.value--
    if(this.value <= 0){
      this.value = 0
    }
    this.updateNumberI.emit(this.value);
  }
}
