import { Component, Input } from '@angular/core';

import { HttpService } from "../../providers/http-service";
import { Native } from "../../providers/native";
import { NavController, ModalController } from 'ionic-angular';

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

  constructor(
    public httpService: HttpService,
    public native: Native,
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {
    console.log('Hello SingleFoodsItem Component');
    this.animateClass = { 'fade-in-item': true };
  }
  @Input() data: any;
  @Input() events: any;
  @Input() toTop: any = true;

  animateItems = [];
  animateClass: any;
  ParticularsPage: any = 'ParticularsPage';

  onEvent(event: string, item: any, e: any) {
    if (e) {
      e.stopPropagation();
    }
    if (this.events[event]) {
      this.events[event](item);
    }
  }
  ngOnChanges() {
    if (this.toTop) {
      this.animateItems = [];
    }
    let that = this;
    for (let i = 0; i < that.data.length; i++) {
      // setTimeout(function () {
      that.animateItems.push(that.data[i]);
      that.data[i].showBtn = false;
      // }, 80 * i);
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
    this.clearBtn();
    item.showBtn = true;
  }
  onCollect(item) {
    this.httpService.getGoodsCollect({ goods_id: item.id }).then((res) => {
      if (res.status == 1) {
        this.native.showToast('关注成功~')
        item.is_collect = 1;
      }
    })
  }
  goParticularsPage(id) {
    this.navCtrl.push('ParticularsPage', { goodsId: id });
  }
  ngOnDestroy() {
    this.clearBtn()
  }
  /**
   * 
   * @param res 商品属性列表
   * @param type 商品类型（镜片、镜架）
   */
  openAttrModal(e, item) {
    e.stopPropagation();
    let modal = this.modalCtrl.create('ParticularsModalAttrPage', {
      headData: item,
      id: item.id,
      cutId: item.cutting_id
    }, { cssClass: 'my-modal-style' });
    modal.onDidDismiss(data => {
      if (data && data == 'CarPage') {
        this.navCtrl.push(data);
      }
    });
    modal.present();
  }
}
