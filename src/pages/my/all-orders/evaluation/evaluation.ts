import { Component, ViewChild, ElementRef } from '@angular/core';
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
   @ViewChild('evaluation') evaluationForm: ElementRef;
   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private httpServ: HttpService,
      public events: Events,
      public ele: ElementRef,
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
   submit(evaluation) {
      let params = {
         goods_list: [],
         accord_rank: this.orderData.accord_rank,
         service_rank: this.orderData.service_rank,
         delivery_rank: this.orderData.delivery_rank,
         is_anonymity: this.orderData.is_anonymity,
      }
      for (let i = 0; i < this.orderData.goods_list.length; i++) {
         const goods = this.orderData.goods_list[i];
         params.goods_list[i] = ({
            comment_rank: goods.comment_rank,
            content: goods.content,
            goods_id: goods.goods_id,
            rec_id: goods.rec_id,
            img: []
         })
         if (goods.img) {
            for (let j = 0; j < goods.img.length; j++) {
               const img = goods.img[j];
               params.goods_list[i].img[j] = img.img_url;
            }
         }
      }
      this.httpServ.commentInsertComment(params).then((res) => {
         if (res.status == 1) {
            let nav = this.navCtrl.last();
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
