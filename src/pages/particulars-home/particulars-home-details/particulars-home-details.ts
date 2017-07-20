import { Component, Renderer, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";

/**
 * Generated class for the ParticularsHomeDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  segment: 'particulars-home-details/:suppliersId'
})
@Component({
  selector: 'page-particulars-home-details',
  templateUrl: 'particulars-home-details.html',
})
export class ParticularsHomeDetailsPage {
  shopdata: any;
  supplier_id = this.navParams.get('suppliersId');

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private el: ElementRef,
    private renderer: Renderer,
    private httpService: HttpService,
    private native: Native,
    public popoverCtrl: PopoverController
  ) { }
  ngOnInit() {
    this.getShopData();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticularsHomeDetailsPage');
  }
  getShopData(){
    this.httpService.CatrgorySupplierInfo({ suppliers_id: this.supplier_id }).then((res) => {
      if (res.status == 1) {
        this.shopdata = res;
      }
    })
  }
  goShopFashion() {
    this.navCtrl.push('ShopAllFashionPage');
  }
  presentPopover() {
    let popover = this.popoverCtrl.create('DetailErweimaPage', {name:this.shopdata.data.name,qrcode:this.shopdata.data.qrcode}, { cssClass: 'page-particulars-home-details-popover' });
    popover.present();
  }
  collectStore(is_collect) {
    if (is_collect) {
      this.httpService.CollectShop({ id: this.supplier_id, type: 0 }).then((res) => {
        if (res.status) {
          this.native.showToast('已取消关注', null, false);
          this.getShopData();
        }
      })
    } else {
      this.httpService.CollectShop({ id: this.supplier_id, type: 1 }).then((res) => {
        if (res.status) {
          this.native.showToast('收藏成功', null, false);
          this.getShopData();
        }
      })
    }
  }
}
