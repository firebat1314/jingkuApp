import { Component, Input } from '@angular/core';
import { HttpService } from "../../providers/http-service";
import { Native } from "../../providers/native";

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
    public httpService: HttpService,
    public native: Native

  ) {
    console.log('Hello SingleCard Component');
    this.animateClass = { 'fade-in-item': true };
  }
  @Input() data: any;
  @Input() events: any;

  animateClass: any;
  animateItems = [];
  ParticularsPage: any = 'ParticularsPage';

  ngOnDestroy() {
    this.clearBtn()
  }
  ngOnChanges() {
    this.animateItems = [];
    if (this.data) {
      for (let i = 0; i < this.data.length; i++) {
        setTimeout( () => {
          this.data[i].showBtn = false;
          this.animateItems.push(this.data[i]);
        }, 50 * i);
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
  onCollect(item,e) {
    if (e) { e.stopPropagation(); }
    this.httpService.getGoodsCollect({ goods_id: item.id }).then((res) => {
      console.log(res)
      if (res.status == 1) {
        this.native.showToast('关注成功~')
        item.is_collect = 1;
      }
    })
  }
}
