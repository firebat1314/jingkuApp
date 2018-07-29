import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events, Content, IonicPage, FabButton } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";

/*
  Generated class for the DiscountCoupon page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
   selector: 'page-discount-coupon',
   templateUrl: 'discount-coupon.html'
})
export class DiscountCouponPage {
   data: any;
   @ViewChild(Content) content: Content;
   @ViewChild(FabButton) fabButton: FabButton;
   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public native: Native,
      public events: Events,
      public httpService: HttpService
   ) { }

   ionViewDidLoad() {
      console.log('ionViewDidLoad DiscountCouponPage');
   }
   ngOnInit() {
      this.getCouponData();
   }
   ngAfterViewInit() {
      /* 回到顶部按钮 */
      this.fabButton.setElementClass('fab-button-out', true);
      this.content.ionScroll.subscribe((d) => {
         this.fabButton.setElementClass("fab-button-in", d.scrollTop >= d.contentHeight);
      });
   }
   getCouponData() {
      this.httpService.coupon({ page: 1 }).then((res) => {
         if (res.status == 1) {
            this.data = res;
         }
      })
   }
   getPrivilege(is_get, type_id, suppliers_id) {
      if (is_get == 1 || is_get == 2) {
         if (suppliers_id == 0) {
            this.navCtrl.push('BrandListPage', { keyword: '镜库' })
         } else if (suppliers_id < 0) {
            this.navCtrl.push('BrandListPage', { keyword: '' })
         } else {
            this.navCtrl.push('ParticularsHomePage', { suppliersId: suppliers_id })
         }
      }else if (is_get == 0) {
         this.native.openAlertBox('确认领取优惠券', () => {
            this.httpService.sendByUser({ type_id: type_id }).then((res) => {
               if (res.status == 1) {
                  this.native.showToast('领取优惠券成功');
                  is_get = 1
                  this.getCouponData();
               }
            })
         })
      }
   }
   goParticularsHomePage(suppliers_id) {
      this.navCtrl.push('ParticularsHomePage', { suppliersId: suppliers_id })
   }
   goClassPage(value) {
      this.navCtrl.pop().catch(res => { history.back() });
      this.navCtrl.parent.select(1);
      this.events.publish('classify:selectSegment', value);
   }

   flag: boolean = true;
   doInfinite(infiniteScroll) {
      if (this.data.page < this.data.pages) {
         this.httpService.coupon({ page: ++this.data.page }).then((res) => {
            if (res.status == 1) {
               Array.prototype.push.apply(this.data.list, res.list);
            }
            setTimeout(() => {
               infiniteScroll.complete();
            }, 500);
         })
      } else {
         this.flag = false;
      }
   }
   scrollToTop() {
      this.content.scrollToTop();
   }
}