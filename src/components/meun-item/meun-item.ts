import { Component, Input,ElementRef,ViewChild } from '@angular/core';
import { Events } from "ionic-angular";

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
  data;

  @Input() showRange: Boolean;
@ViewChild('click') click;
  constructor(
    public events: Events,
    public element:ElementRef
  ) {
    console.log('Hello MeunItem Component');
    this.events.subscribe('user:listFilter', (res) => {
      console.log(res)
      this.data = res;
    });
  }
  ngAfterViewInit(){
    console.log(this.click)
    console.log(this.element)
  }
}
