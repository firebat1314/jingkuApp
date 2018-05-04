import { Component, Input } from '@angular/core';
import { HttpService } from "../../providers/http-service";
import { Native } from "../../providers/native";
import { ModalController } from 'ionic-angular';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { MineProvider } from '../../providers/mine/mine';

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

  showPrice: boolean;
  constructor(
    public httpService: HttpService,
    public native: Native,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public mine: MineProvider
  ) {
    console.log('Hello SingleCard Component');
  }
  @Input() data: any;
  @Input() events: any;
  @Input() toTop: any = true;

  animateClass: any = { 'fade-in-item': true };
  animateItems = [];
  ParticularsPage: any = 'ParticularsPage';
  ngOnInit() {
  }
  ngOnDestroy() {
    this.clearBtn();
  }
  ngOnChanges() {
    this.animateItems = this.data || [];
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
  onCollect(item, e) {
    if (e) { e.stopPropagation(); }
    this.httpService.getGoodsCollect({ goods_id: item.id }).then((res) => {
      if (res.status == 1) {
        this.native.showToast('关注成功')
        item.is_collect = 1;
      }
    })
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
