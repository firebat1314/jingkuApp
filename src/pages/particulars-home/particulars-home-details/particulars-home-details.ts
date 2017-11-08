import { Component, Renderer, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Events } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";

/**
 * Generated class for the ParticularsHomeDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  segment: 'particulars-home-details/:suppliersId',
  defaultHistory: ['ParticularsHomePage'],
})
@Component({
  selector: 'page-particulars-home-details',
  templateUrl: 'particulars-home-details.html',
})
export class ParticularsHomeDetailsPage {
  shopdata: any;
  suppliers_id = this.navParams.get('suppliersId');

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private el: ElementRef,
    private renderer: Renderer,
    private httpService: HttpService,
    private native: Native,
    private events: Events,
    public popoverCtrl: PopoverController
  ) { }
  ngOnInit() {
    this.getShopData();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticularsHomeDetailsPage');
  }
  getShopData() {
    this.httpService.CatrgorySupplierInfo({ suppliers_id: this.suppliers_id }).then((res) => {
      if (res.status == 1) {
        this.shopdata = res;
      }
    })
  }
  goShopFashion() {
    this.navCtrl.push('ShopAllFashionPage');
  }
  presentPopover(event, type) {
    let popover = this.popoverCtrl.create('DetailErweimaPage', { type: type, name: this.shopdata.data.name, qrcode: this.shopdata.data.qrcode, company_yyzz: this.shopdata.data.company_yyzz }, { cssClass: 'page-particulars-home-details-popover' });
    popover.present();
  }
  collectStore(is_collect) {
    if (is_collect) {
      this.httpService.CollectShop({ id: this.suppliers_id, type: 0 }).then((res) => {
        if (res.status) {
          this.native.showToast('取消收藏', null, false);
          //更新上一页收藏状态
          this.events.publish('particulars-home-details:update-collect');
          this.getShopData();
        }
      })
    } else {
      this.httpService.CollectShop({ id: this.suppliers_id, type: 1 }).then((res) => {
        if (res.status) {
          this.native.showToast('收藏成功', null, false);
          this.events.publish('particulars-home-details:update-collect');
          this.getShopData();
        }
      })
    }
  }
  getExistance(i: number) {
    return i > 4;
  }
  callnumber(number) {
    if (this.native.isMobile()) {
      this.native.openAlertBox('拨打商家电话:' + number, () => {
        this.native.openCallNumber(number, false);
      })
    } else {
      location.href = 'tel:'+number;
    }
  }
  goShopAllFashionPage() {
    this.navCtrl.push('ShopAllFashionPage', { brandList: this.shopdata.data.brand_list })
  }
  goBackPage(type) {
    this.navCtrl.push('ParticularsHomePage', { type: type, suppliersId: this.suppliers_id });
  }
}
