import { Component, Input } from '@angular/core';

/*
  Generated class for the SingleFoodsItem component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'single-foods-item',
  templateUrl: 'single-foods-item.html'
})
export class SingleFoodsItemComponent {

  constructor() {
    console.log('Hello SingleFoodsItem Component');
    this.animateClass = { 'fade-in-left-item': true };
  }
  @Input() data: any;
  @Input() events: any;

  animateItems = [];
  animateClass: any;



  onEvent(event: string, item: any, e: any) {
    if (e) {
      e.stopPropagation();
    }
    if (this.events[event]) {
      this.events[event](item);
    }
  }

  ngAfterViewInit() {
    let that = this;
    for (let i = 0; i < that.data.items.length; i++) {
      setTimeout(function () {
        that.animateItems.push(that.data.items[i]);
      }, 200 * i);
    }
  }
}
