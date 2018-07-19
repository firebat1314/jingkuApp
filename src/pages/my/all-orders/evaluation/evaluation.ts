import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpService } from '../../../../providers/http-service';

/**
 * Generated class for the EvaluationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
   segment: 'evaluation/:order_id'
})
@Component({
   selector: 'page-evaluation',
   templateUrl: 'evaluation.html',
})
export class EvaluationPage {

   orderId = this.navParams.get('order_id');
   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private httpServ: HttpService,
      public events: Events,
   ) {
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad EvaluationPage');
   }

   orderData = null;
   /* 是否可以评论 */
   is_true = null;

   /* this.params = {
      content: null,
      comment_rank: null,
      accord_rank: null,
      service_rank: null,
      delivery_rank: null,
      comment_label: null,
      img: null,
   }; */
   /* 是否可以评论 */
   ngOnInit() {
      this.httpServ.commentIsComment({
         order_id: this.orderId
      }).then((res) => {
         if (res.status == 1) {
            this.is_true = res.is_true;
         }
      })
      this.httpServ.orderInfo({
         order_id: this.orderId
      }).then((res) => {
         if (res.status == 1) {
            this.orderData = res;
         }
      })
   }
   /* 获取店铺评分 */
   /* this.httpServ.commentCommentReckon({
      goods_id: this.goods_id,
      id: this.shopId
   }).success(function (res) {
      if (res.status == 1) {
         this.commentCommentReckon = res;
      }
   }) */
   /* 订单信息 */

   selectImgs(img, item) {
      if (!item.img) {
         item.img = [];
      }
      item.img.push(img);
   }
   deletePic(i, item) {
      item.img.splice(i, 1);
   }
   submit() {
      this.httpServ.commentInsertComment({
         data: this.orderData
      }).then((res) => {
         if (res.status == 1) {
            var nav = this.navCtrl.last();
            this.navCtrl.push('EvaluationOverPage', { suppliers_id: res.suppliers_info.id }).then(() => {
               this.navCtrl.removeView(nav, { animate: false });
               this.events.publish('allOrders:update');
               this.events.publish('EvaluationListPage:update');
               this.events.publish('my:update');
            });
         }/*  else {
            this.navCtrl.pop().catch(() => { history.back() });
         } */
      })
   }
}
