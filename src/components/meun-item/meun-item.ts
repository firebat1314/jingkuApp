import { Component,Input } from '@angular/core';

/*
  Generated class for the MeunItem component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'meun-item',
  templateUrl: 'meun-item.html'
})
export class MeunItemComponent {

  @Input() showRange:Boolean;

  constructor() {
    console.log('Hello MeunItem Component');

  }

}
