import { Component, Input } from '@angular/core';

import { ParticularsPage } from '../../pages/home/particulars/particulars'

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
    this.animateClass = { 'fade-in-item': true };
  }
  @Input() data: any;
  @Input() events: any;

  animateItems = [];
  animateClass: any;
  ParticularsPage: any = ParticularsPage;

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
    for (let i = 0; i < that.data.length; i++) {
      setTimeout(function () {
        that.animateItems.push(that.data[i]);
        that.data[i].showBtn = false;

      }, 80 * i);
    }
  }
  clearBtn() {
    for (let i = 0; i < this.animateItems.length; i++) {
      this.animateItems[i].showBtn = false;
    }
  }
  close(item, e) {
    e.stopPropagation();
    item.showBtn = false;

  }
  tapEvent(item, e) {
    console.log("长按指令", e)
    this.clearBtn();
    item.showBtn = true;
  }
  ngOnDestroy() {
    console.log("销毁指令")
    this.clearBtn()
  }
}
