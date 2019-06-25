import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, IonicPage, Events, AlertController,ModalController, ItemReorder,ViewController } from 'ionic-angular';
import { Native } from '../../../../providers/native';
import { HttpService } from '../../../../providers/http-service';
import { MineProvider } from '../../../../providers/mine/mine';
/*
  Generated class for the AllOrders page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
   selector: 'page-addd-orders',
   templateUrl: 'addd-orders.html'
})
export class AdddOrdersPage {
   showLoading: boolean;
   infiniteScroll: any;
   orderList: any;
   pageIndex: number = this.navParams.get('index') || 0;
   orderData: any;
   @ViewChild(Content)
   content: Content;
   constructor(public navCtrl: NavController, public navParams: NavParams,   private viewCtrl: ViewController,public modalCtrl: ModalController, public httpService: HttpService, public native: Native, public events: Events, private alertCtrl: AlertController, private mine: MineProvider) {
      this.events.subscribe('adddOrders:update', () => {
         this.getByPageIndex(false);
      });
   }
   ionViewDidLoad() {
      console.log('ionViewDidLoad AdddOrdersPage');
   }
   ionViewDidLeave() {
      this.infiniteScroll = null;
   }
   ngAfterViewInit() {
   }
   ngOnInit() {
      this.getByPageIndex();
   }
   ngOnDestroy() {
      this.events.unsubscribe('adddOrders:update');
   }
   getByPageIndex(showLoading = false) {
      this.showLoading = true;
      if (this.infiniteScroll)
         this.infiniteScroll.enable(true);
      let type: string;
      switch (this.pageIndex) {
         case 0:
            type = '';
            break;
         case 1:
            type = 'unpay';
            break;
         case 2:
            type = 'collect';
            break;
         case 3:
            type = 'ok';
            break;
         case 4:
            type = 'cancel';
            break;
         default:
            type = '';
            break;
      }
      return this.httpService.showmachiningorder({ page: 1, type: type }, { showLoading: showLoading }).then((res) => {
         this.showLoading = false;
         if (res.status == 1) {
            // this.orderData_all = res;
            this.orderData = res;
            this.orderList = res.list;
         }
      });
   }
   /*下拉刷新*/
   doRefresh(refresher) {
      this.getByPageIndex(false).then(() => {
         setTimeout(() => {
            refresher.complete();
         }, 500);
      });
   }
   checkTab($event) {
      this.infiniteScroll ? this.infiniteScroll.enable(true) : null;
      this.pageIndex = $event;
      this.content.scrollToTop(0);
      this.getByPageIndex();
   }
   canLeave=false;
   pushPage(page, params = {}) {
      this.canLeave = true;
      var nav = this.navCtrl.last();
      return this.navCtrl.push(page, params).then(() => {
         this.navCtrl.removeView(nav, { animate: false });
      }).then(() => {
         this.canLeave = false;
      });
   }
   goOrdersDetailPage(item) {
      debugger
      // this.navCtrl.push('ChooseLensRPage', { order_id: orderId,pian_rec: [],rec_ids: [],type: "you",rec_id: null
      // });de

      // let modal = this.modalCtrl.create('ChooseLensRPage', { order_id: item.order_id, rec_id:item.rec_id, rec_ids: item.rec_ids, pian_rec: item.pian_rec ,casss:'2222222' }, { cssClass: '',});
      // modal.present();
      this.  pushPage('ChooseLensRPage',{ order_id: item.order_parent, rec_id:item.rec_id, rec_ids: item.rec_ids, pian_rec: item.pian_rec ,casss:'2222222' },)
      // this.viewCtrl.dismiss( 'submit');
   }
   goParticularsPage(id) {
      this.navCtrl.push('ParticularsPage', { goodsId: id });
   }
   doInfinite(infiniteScroll) {
      let type: string;
      switch (this.pageIndex) {
         case 0:
            type = '';
            break;
         case 1:
            type = 'unpay';
            break;
         case 2:
            type = 'collect';
            break;
         case 3:
            type = 'ok';
            break;
         case 4:
            type = 'cancel';
            break;
         default:
            type = '';
            break;
      }
      this.infiniteScroll = infiniteScroll;
      if (this.orderData.page < this.orderData.pages) {
         var p = this.orderData.page;
         this.httpService.showmachiningorder({ page: ++p, type: type }, { showLoading: false }).then((res) => {
            if (res.status == 1) {
               this.orderData = res;
               this.orderList = this.orderList.concat(res.list);
            }
            setTimeout(() => {
               this.infiniteScroll.complete();
            }, 500);
         });
      }
      else {
         this.infiniteScroll.enable(false);
      }
   }
   toPay(item) {
      if (!this.mine.canCheckout) {
         this.native.showToast('暂无结算权限，请联系企业管理员');
         return false;
      }
      this.navCtrl.push('PaymentMethodPage', { order_id: item.order_id, log_id: item.log_id });
   }
   confirmReceipt(order_id) {
      this.native.openAlertBox('确认收货', () => {
         this.httpService.affirmReceived({ order_id: order_id }).then((res) => {
            if (res.status == 1) {
               this.native.showToast('订单操作成功');
               this.getByPageIndex();
            }
         });
      });
   }
   orderTracking(order_id) {
      this.native.showToast('敬请期待');
   }
   cancelOrder(order_id) {
      this.native.openAlertBox('是否取消订单', () => {
         this.httpService.cancelOrder({ order_id: order_id }).then((res) => {
            if (res.status == 1) {
               this.native.showToast('订单操作成功');
               this.getByPageIndex();
            }
         });
      });
   }
   deleteOrder(id, index) {
      this.native.openAlertBox('删除订单', () => {
         this.httpService.delOrder({ order_id: id }).then((res) => {
            if (res.status == 1) {
               this.orderList.splice(index, 1);
               this.native.showToast(res.data);
            }
         });
      });
   }
   goParticularsHomePage(id) {
      this.navCtrl.push('ParticularsHomePage', { suppliersId: id });
   }
   goAddProcess(order_parent) {
      this.navCtrl.push('AddProcessPage', { order_parent: order_parent });
      // this.native.showToast('暂未开放',null,false);
   }
   buyAgain(order_id) {
      this.httpService.alignBuy({ order_id: order_id }).then((res) => {
         if (res.status) {
            this.navCtrl.push('CarPage');
         }
         else if (res.status == -2) {
            this.alertCtrl.create({
               title: '镜库科技',
               message: '购买需上传医疗器械许可证，是否上传',
               buttons: [
                  {
                     text: '确定',
                     handler: () => {
                        this.navCtrl.push('CompanyInfoPage');
                     }
                  },
                  {
                     text: '取消',
                  }
               ]
            }).present();
         }
      });
   }
   cancelApply(order) {
      const prompt = this.alertCtrl.create({
         title: '申请取消',
         // message: "请填写备注",
         inputs: [
            {
               name: 'note',
               placeholder: '请填写备注'
            },
         ],
         buttons: [
            {
               text: '取消',
               handler: data => {
               }
            },
            {
               text: '提交',
               handler: data => {
                  this.httpService.cancelApply({ order_id: order.order_id, note: data.note }).then(res => {
                     if (res.status == 1) {
                        this.native.showToast(res.info);
                        order.isOrderCancel = 2;
                     }
                  });
               }
            }
         ]
      });
      prompt.present();
   }
}
