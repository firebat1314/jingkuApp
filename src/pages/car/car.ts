import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, Events, Content, IonicPage, App } from 'ionic-angular';
import { Native } from "../../providers/native";
import { HttpService } from "../../providers/http-service";
import { MineProvider } from '../../providers/mine/mine';

/*
  Generated class for the Car page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage({
   defaultHistory: []
})
@Component({
   selector: 'page-car',
   templateUrl: 'car.html'
})
export class CarPage {
   isEdit: boolean = false;
   carDetails: any;
   @ViewChild(Content) content: Content;

   hasBackBtn: boolean = false;

   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public native: Native,
      public alertCtrl: AlertController,
      public httpService: HttpService,
      public events: Events,
      public app: App,
      public mine: MineProvider,
   ) {

   }
   ionViewDidLoad() {
      console.log('ionViewDidLoad CarPage');
   }
   ionViewDidEnter() {
      this.app.setTitle('购物车');
   }
   ionViewDidLeave() {
   }
   ngOnInit() {
      if (this.navCtrl.length()!=1) {
         this.hasBackBtn = true;
      }
      this.events.subscribe('car:update', () => {
         this.getFlowGoods();
      })
      this.getFlowGoods().then(() => {
         this.content.resize();
      });
   }
   ngOnDestroy() {
   }
   goback() {
      this.navCtrl.pop().catch(() => { history.back() });
   }
   getFlowGoods() {
      return this.httpService.getFlowGoods().then((res) => {
         if (res.status == 1) {
            this.carDetails = res;
         }
      })
   }
   /**
    * 下拉刷新
    * @param refresher 
    */
   doRefresh(refresher) {
      this.getFlowGoods().then(() => {
         setTimeout(() => {
            refresher.complete();
         }, 500);
      })
   }
   /**
    * 加减数量
    * @param event 点击事件=>商品数量
    * @param item 单个商品
    */
   numberChangeI(event, item) {
      this.httpService.changeNumCart({ rec_id: item.rec_id, number: event }).then((res) => {
         this.getFlowGoods().then(() => { });
      })
      // this.calculateTotal();
   }
   checkGoods(id, type, is_select) {
      this.httpService.selectChangePrice({ id: id, type: type, is_select: is_select }).then((res) => {
         this.getFlowGoods();
      })
   }
   checkGoodsAttr(rec_id, is_select) {
      this.httpService.changeProductNum({
         rec_id: rec_id,
         type: is_select
      }).then((res) => {
         if (res.status) {
            this.getFlowGoods();
         }
      })
   }
   check() {
      var shopIds = [];
      var goodsIds = [];
      var attrIds = [];
      for (let i = 0, item1 = this.carDetails.suppliers_goods_list; i < item1.length; i++) {//店铺列表
         if (item1[i].selected) {
            shopIds.push(item1[i].suppliers_id);
         }
         for (let n = 0, item2 = item1[i].goods_list; n < item2.length; n++) {//商品列表
            if (item2[n].selected) {
               goodsIds.push(item2[n].goods_id);
            }
            for (let g = 0, item3 = item2[n].attrs; g < item3.length; g++) {//商品属性列表
               if (item3[g].selected) {
                  attrIds.push(item3[g].rec_id);
               }
            }
         }
      }
      console.log(shopIds, goodsIds, attrIds)
      return {
         shopIds: shopIds,
         goodsIds: goodsIds,
         attrIds: attrIds
      };
   }
   checkAll() {
      if (this.carDetails.selected) {
         for (let i = 0, item1 = this.carDetails.suppliers_goods_list; i < item1.length; i++) {//店铺列表
            item1[i].selected = true;
            this.check1(item1[i], this.carDetails);
         }
      } else {
         for (let i = 0, item1 = this.carDetails.suppliers_goods_list; i < item1.length; i++) {//店铺列表
            item1[i].selected = false;
            this.check1(item1[i], this.carDetails);
         }
      }
   }
   /* 店铺 */
   check1(item, _item) {
      if (item.selected) {
         var index = 0;
         for (let i = 0, item1 = _item.suppliers_goods_list; i < item1.length; i++) {//
            if (item1[i].selected) {
               index++;
            }
         }
         if (index == _item.suppliers_goods_list.length) {
            this.carDetails.selected = true;
         }
         for (let i = 0, item1 = item.goods_list; i < item1.length; i++) {//
            item1[i].selected = true;
            this.check2(item1[i], item)
         }
      } else {
         this.carDetails.selected = false;

         for (let i = 0, item1 = item.goods_list; i < item1.length; i++) {//
            item1[i].selected = false;
            this.check2(item1[i], item)
         }
      }
   }
   /* 商品 */
   check2(item, _item) {
      if (item.selected) {
         var index = 0;
         for (let i = 0, item1 = _item.goods_list; i < item1.length; i++) {//
            if (item1[i].selected) {
               index++;
            }
         }
         if (index == _item.goods_list.length) {
            _item.selected = true;
         }
         var index = 0;
         for (let i = 0, item1 = this.carDetails.suppliers_goods_list; i < item1.length; i++) {//
            if (item1[i].selected) {
               index++;
            }
         }
         if (index == this.carDetails.suppliers_goods_list.length) {
            this.carDetails.selected = true;
         }
         for (let i = 0, item1 = item.attrs; i < item1.length; i++) {//
            item1[i].selected = true;
            this.check3(item1[i], item, _item)
         }
      } else {
         _item.selected = false;
         this.carDetails.selected = false;
         for (let i = 0, item1 = item.attrs; i < item1.length; i++) {//
            item1[i].selected = false;
            this.check3(item1[i], item, _item)
         }
      }
   }
   /* 属性 */
   check3(item, _item, __item) {
      if (item.selected) {
         var index = 0;
         for (let i = 0, item1 = _item.attrs; i < item1.length; i++) {//
            if (item1[i].selected) {
               index++;
            }
         }
         if (index == _item.attrs.length) {
            _item.selected = true;
         }
         var index = 0;
         for (let i = 0, item1 = __item.goods_list; i < item1.length; i++) {//
            if (item1[i].selected) {
               index++;
            }
         }
         if (index == __item.goods_list.length) {
            __item.selected = true;
         }
         var index = 0;
         for (let i = 0, item1 = this.carDetails.suppliers_goods_list; i < item1.length; i++) {//
            if (item1[i].selected) {
               index++;
            }
         }
         if (index == this.carDetails.suppliers_goods_list.length) {
            this.carDetails.selected = true;
         }
      } else {
         _item.selected = false;
         __item.selected = false;
         this.carDetails.selected = false;
      }
   }
   /* 关注商品 */
   beCareFor() {
      if (!this.check().goodsIds.length) {
         this.native.showToast('请选择需要关注商品');
         return;
      }
      this.httpService.batchGoodsCollect({
         goods_ids: this.check().goodsIds
      }).then((res) => {
         if (res.status == 1) {
            this.native.showToast('关注成功')
         }
      })
   }
   /**
    * 滑动删除商品
    * @param item3 
    */
   deleteItem(item3) {
      this.native.openAlertBox("确认删除该商品吗？", () => {
         this.httpService.dropCartGoodsSelect({ rec_id: item3.rec_id }).then((res) => {
            if (res.status == 1) {
               this.native.showToast('删除成功');
               this.events.publish('car:update');
            }
         })
      })
   }
   /* 删除购物车商品 */
   dropCartGoodsSelect() {
      var obj = this.check();
      console.log(obj)
      if (!obj.goodsIds.length && !obj.attrIds.length) {
         this.native.showToast('请选择需要删除商品');
         return;
      }
      this.native.openAlertBox('删除购物车选中商品？', () => {
         this.httpService.dropCartGoodsSelect({ goods_ids: obj.goodsIds, rec_id: obj.attrIds }).then((res) => {
            if (res.status == 1) {
               this.native.showToast('删除成功')
               this.events.publish('car:update');
            }
         })
      })
   }
   /* 去结算 */
   goAccounts() {
      if (!this.mine.canCheckout) { this.native.showToast('暂无结算权限，请联系企业管理员'); return false }

      var arr = []
      for (let i = 0, item = this.carDetails.suppliers_goods_list; i < item.length; i++) {
         for (let k = 0; k < item[i].goods_list.length; k++) {
            if (!item[i].goods_list[k].is_select) {
               arr.push(item[i].goods_list[k].goods_id)
            }
         }
      }
      this.httpService.delNoShop({ goods_ids: arr }).then((res) => {
         if (res.status == 1) {
            // this.navCtrl.push('WriteOrdersPage');
            this.httpService.clearFlowOrder().then(() => {
               this.httpService.checkout(null, { showToast: false }).then((res) => {
                  if (res.suppliers_id > 0) {
                     this.native.openAlertBox(res.info, () => {
                        this.navCtrl.push('ParticularsHomePage', { suppliersId: res.suppliers_id })
                     })
                  } else {
                     this.navCtrl.push('WriteOrdersPage');
                  }
               })
            });
         }
      })
   }
   /* 转跳商品详情 */
   goParticularPage(item2) {
      console.log(item2)
      this.navCtrl.push('ParticularsPage', { goodsId: item2.goods_id, cutId: item2.cutting_id > 0 ? item2.cutting_id : 0 })
   }
   /*————————————————————————————— 购物车总价格计算 —————————————————————————————————————*/
   /*  calculateTotal() {
       let total = 0;
       let number = 0;
       for (let i = 0, item = this.carDetails.suppliers_goods_list; i < item.length; i++) {
         this.calculateShopPrice(item[i]);
         total += item[i].subtotal;
         number += item[i].number;
       }
       this.carDetails.total.goods_amount = total;
       this.carDetails.total.real_goods_count = number;
       this.event.publish('user:carNumber', number);
     }
     calculateShopPrice(items) {//购物车小计
       let subtotal = 0;
       let number = 0;
       for (let i = 0, item = items.goods_list; i < item.length; i++) {//单个店铺的所有商品
         for (let j = 0; j < item[i].attrs.length; j++) {//单个商品的所有属性
           subtotal += Number(item[i].attrs[j].goods_number) * Number(item[i].attrs[j].goods_price.substr(1));
           number += Number(item[i].attrs[j].goods_number)
         }
       }
       items.goods_price_total = subtotal;
       items.goods_count = number;
     }*/
}
