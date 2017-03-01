import { Component, Input } from '@angular/core';
import { ParticularsPage } from '../../pages/home/particulars/particulars'

/*
  Generated class for the SingleCard component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'single-foods-card',
  templateUrl: 'single-card.html'
})
export class SingleCardComponent {

  constructor() {
    console.log('Hello SingleCard Component');
    this.animateClass = { 'fade-in-item': true };

  }
  @Input() data: any;
  @Input() events: any;

  animateClass: any;
  animateItems = [];
  ParticularsPage:any= ParticularsPage;

  ngAfterViewInit() {
    let that = this;
    for (let i = 0; i < that.data.items.length; i++) {
      setTimeout(function () {
        that.animateItems.push(that.data.items[i]);
      }, 200 * i);
    }
  }
ngOnDestroy(){
  console.log("销毁指令")
}
}
