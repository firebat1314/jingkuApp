import { Component, Input } from '@angular/core';
import { ParticularsPage } from '../../pages/home/particulars/particulars'
import { HttpService } from "../../providers/http-service";

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

  constructor(
    public httpService: HttpService
  ) {
    console.log('Hello SingleCard Component');
    this.animateClass = { 'fade-in-item': true };
  }
  @Input() data: any;
  @Input() events: any;

  animateClass: any;
  animateItems = [];
  ParticularsPage: any = ParticularsPage;

  ngOnChanges() {
    this.animateItems = [];
    let that = this;
    // console.log(that.data)
    if (this.data) {
      for (let i = 0; i < that.data.length; i++) {
        setTimeout(function () {
          that.data[i].showBtn = false;
          that.animateItems.push(that.data[i]);
        }, 80 * i);
      }
    }
  }
  clearBtn() {
    for (let i = 0; i < this.animateItems.length; i++) {
      this.animateItems[i].showBtn = false;
    }
  }
  tapEvent(item, e) {
    this.clearBtn();
    item.showBtn = true;
  }
  onCollect(item) {
    this.httpService.batchGoodsCollect({ goods_ids: [item.goods_id] }).then((res) => {
      console.log(res)
      if (res.status == 1) {
        item.is_collect = 1;
      }
    })
  }
  ngOnDestroy() {
    this.clearBtn()
  }
}
