import { Component, ChangeDetectorRef, Renderer, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, Content, ModalController } from 'ionic-angular';
import { HttpService } from '../../../../providers/http-service';
import { Native } from '../../../../providers/native';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AccountProcessProvider } from '../account-process-provider';

/**
 * Generated class for the AddProcessPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
export class orderParams {
   constructor(public showBody?: boolean) { }
}

@IonicPage({
   segment: 'add-process-scanner/:order_parent/:edit/:is_scanner'
})
@Component({
   selector: 'page-add-process-scanner',
   templateUrl: 'add-process-scanner.html',
})
export class AddProcessScannerPage {
   data: any;
   order_id = this.navParams.get('order_parent');
   is_scanner = true;
   edit = this.navParams.get('edit') == 0 ? false : true;
   list: Array<any> = [(new orderParams(true))];
   rec_ids: Array<string> = new Array();//已选商品id

   @ViewChild(Content) myContent: Content;
   flag: any;
   constructor(
      private navCtrl: NavController,
      private navParams: NavParams,
      private httpService: HttpService,
      private native: Native,
      private modalCtrl: ModalController,
      private ib: InAppBrowser,
      private thisProvider: AccountProcessProvider,
   ) {
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad AddProcessPage');
   }
   ngOnInit() {
      this.getData();
   }
   ngAfterViewInit() {

   }
   /**
    * 获取已保存加工单信息
    * @param index 加工单下标
    */
   getData(index?) {
      this.httpService.SpecialMachiningmachining_info().then((res) => {//{is_ceshi:1}
         if (res.status == 1 && res.machining.length) {
            this.data = res;
            var list = [];
            for (let i = 0; i < res.machining.length; i++) {
               list[i] = (new orderParams(false));
               const element = res.machining[i];

               if (element.jia_attr) {
                  Object.assign(element.jia_attr, element.frame_attr);
               }
               list[i].J = element.jia_attr;
               list[i].R = element.right_attr;
               list[i].L = element.left_attr;

               if (element.eyeglass_cfg) {
                  if (element.eyeglass_cfg.left) {
                     list[i].lzhouxiang = element.eyeglass_cfg.left.zhouxiang;
                     list[i].ladd = element.eyeglass_cfg.left.add;
                     list[i].ltongju = element.eyeglass_cfg.left.tongju;
                     list[i].ltonggao = element.eyeglass_cfg.left.tonggao;
                     list[i].ljytj = element.eyeglass_cfg.left.jytj;
                  }
                  if (element.eyeglass_cfg.right) {
                     list[i].rzhouxiang = element.eyeglass_cfg.right.zhouxiang;
                     list[i].radd = element.eyeglass_cfg.right.add;
                     list[i].rtongju = element.eyeglass_cfg.right.tongju;
                     list[i].rtonggao = element.eyeglass_cfg.right.tonggao;
                     list[i].rjytj = element.eyeglass_cfg.right.jytj;
                  }
               }
            }
            if (index != undefined) list[index].showBody = true;
            this.list = list;
            console.log(this.list)
         } else if (res.status == -2) {
            // this.native.showToast(res.info);
            // this.navCtrl.pop().catch(() => { history.back() });
         } else {
            // this.native.showToast(res.info);
         }
      })
   }
   getRecIds() {//所有选中过的镜片id
      var arr = new Array();
      this.list.forEach(element => {
         element.R ? arr.push(element.R.rec_id) : null;
         element.L ? arr.push(element.L.rec_id) : null;
         element.J ? arr.push(element.J.rec_id) : null;
      });
      this.rec_ids = arr;
   }
   addOrder() {
      this.getRecIds();
      for (let index = 0; index < this.list.length; index++) {
         const element = this.list[index];
         if (!element.R || !element.L || !element.J) {
            this.native.showToast('请完善加工单' + (index + 1) + '信息');
            return;
         }
      }
      this.cache_machining().then((res) => {//保存已添加加工单
         this.list.forEach(e => {
            e.showBody = false;
         });
         this.list.push(new orderParams(true));
         setTimeout(() => {
            this.myContent.scrollToBottom();
         }, 300);
      })

   }
   removeOrder(e, index) {
      e.stopPropagation();
      if (!this.list[index].R && !this.list[index].L && !this.list[index].J) {
         this.list.splice(index, 1);
         // this.native.showToast('删除成功');
         this.getRecIds();
      } else {
         if (this.list.length > 1) {
            this.native.openAlertBox('删除加工单', () => {
               this.httpService.SpecialMachiningdel({ marking: index }).then(res => {
                  if (res.status == 1) {
                     this.list.splice(index, 1);
                     this.getRecIds();
                  } else {
                     this.native.showToast(res.info);
                  }
               })
            });
         } else {
            this.native.showToast('请保留至少一个加工单');
         }
      }
   }

   goChooseLensRPage(item, index, type) {
      if (!item.R) {
         return this.thisProvider.openScanner(index, type).then(res => {
            this.getData(index);
         });
      }
      this.getRecIds();
      let pian_rec = new Array();
      item.R ? pian_rec.push(item.R.rec_id) : null;
      item.L ? pian_rec.push(item.L.rec_id) : null;
      let rec_id = item.R ? item.R.rec_id : null;
      let modal = this.modalCtrl.create('ChooseLensRPage', { order_id: this.order_id, rec_id: rec_id, rec_ids: this.rec_ids, pian_rec: pian_rec, scannerData: this.is_scanner ? item.R : null, scannerIndex: this.is_scanner ? index : null, });
      modal.onDidDismiss((data, role) => {
         if (role == 'submit') {
            item.showBody = true;
            item.R = data;
         }
      })
      modal.present();
   }
   goChooseLensLPage(item, index, type) {
      if (!item.L) {
         return this.thisProvider.openScanner(index, type).then(res => {
            this.getData(index);
         });
      }
      this.getRecIds();
      let pian_rec = new Array();
      item.R ? pian_rec.push(item.R.rec_id) : null;
      item.L ? pian_rec.push(item.L.rec_id) : null;
      let rec_id = item.L ? item.L.rec_id : null;
      let modal = this.modalCtrl.create('ChooseLensLPage', { order_id: this.order_id, rec_id: rec_id, rec_ids: this.rec_ids, pian_rec: pian_rec, scannerData: this.is_scanner ? item.L : null, scannerIndex: this.is_scanner ? index : null, });
      modal.onDidDismiss((data, role) => {
         if (role == 'submit') {
            item.showBody = true;
            item.L = data;
         }
      })
      modal.present();
   }
   goChooseFramePage(item, index, type) {
      if (!item.J) {
         return this.thisProvider.openScanner(index, type).then(res => {
            this.getData(index);
         });
      }
      this.getRecIds();
      let pian_rec = new Array();
      item.R ? pian_rec.push(item.R.rec_id) : null;
      item.L ? pian_rec.push(item.L.rec_id) : null;

      let rec_id = null
      let mach_type = null
      let pinpai = null
      let xinghao = null
      let beizhu = null
      if (item.J) {
         rec_id = item.J.rec_id;//选中多的镜片ID
         mach_type = item.J.mach_type;//加工类型
         pinpai = item.J.pinpai;//镜架品牌
         xinghao = item.J.xinghao;//镜架型号
         beizhu = item.J.beizhu;//镜架型号
      }
      let modal = this.modalCtrl.create('ChooseFramePage', {
         order_id: this.order_id,
         rec_id: rec_id,
         rec_ids: this.rec_ids,
         pian_rec: pian_rec,
         mach_type: mach_type,
         pinpai: pinpai,
         xinghao: xinghao,
         beizhu: beizhu,
         scannerData: this.is_scanner ? item.J : null,
         scannerIndex: this.is_scanner ? index : null,
         settings: this.is_scanner ? this.data.settings : null
      });
      modal.onDidDismiss((data, role) => {
         if (role == 'submit') {
            item.showBody = true;
            item.J = data;
         }
      })
      modal.present();
   }
   cache_machining() {
      return new Promise((resolve, reject) => {
         var cacheMachining = {
            order_id: this.order_id,
            left: [],
            right: [],
            jia: [],
            type: [],
            rqiujing: [],
            rzhujing: [],
            rzhouxiang: [],
            radd: [],
            rtongju: [],
            rtonggao: [],
            rjytj: [],
            lqiujing: [],
            lzhujing: [],
            lzhouxiang: [],
            ladd: [],
            ltongju: [],
            ltonggao: [],
            ljytj: [],
            mach_type: [],
            chebiao: [],
            beizhu: [],
            xinghao: [],
            pinpai: [],
         };
         for (let index = 0; index < this.list.length; index++) {
            const element = this.list[index];
            if (!element.R || !element.L || !element.J) {
               this.native.showToast('请完善加工单' + (index + 1) + '信息');
            }
         }
         this.list.forEach(element => {
            cacheMachining.right.push(this.is_scanner ? element.R.goods_id : element.R.rec_id || null);
            cacheMachining.rqiujing.push(element.R.qiujing || null);
            cacheMachining.rzhujing.push(element.R.zhujing || null);
            cacheMachining.rzhouxiang.push(element.rzhouxiang || null);
            cacheMachining.radd.push(element.radd || null);
            cacheMachining.rtongju.push(element.rtongju || null);
            cacheMachining.rtonggao.push(element.rtonggao || null);
            cacheMachining.rjytj.push(element.rjytj || null);

            cacheMachining.left.push(this.is_scanner ? element.L.goods_id : element.L.rec_id || null);
            cacheMachining.lqiujing.push(element.L.qiujing || null);
            cacheMachining.lzhujing.push(element.L.zhujing || null);
            cacheMachining.lzhouxiang.push(element.lzhouxiang || null);
            cacheMachining.ladd.push(element.ladd || null);
            cacheMachining.ltongju.push(element.ltongju || null);
            cacheMachining.ltonggao.push(element.ltonggao || null);
            cacheMachining.ljytj.push(element.ljytj || null);

            cacheMachining.jia.push(this.is_scanner ? element.J.goods_id : element.J.rec_id || null);
            cacheMachining.mach_type.push(element.J.mach_type || null);
            cacheMachining.chebiao.push(element.J.chebiao || null);
            cacheMachining.beizhu.push(element.J.beizhu || null);
            cacheMachining.xinghao.push(element.J.xinghao || null);
            cacheMachining.pinpai.push(element.J.pinpai || null);
         });
         this.httpService.SpecialMachiningcache_machining(cacheMachining).then((res) => {
            if (res.status) {
               resolve(res);
            } else {
               this.native.showToast(res.info);
            }
         });
      })
   }
   confirm() {
      this.cache_machining().then((res) => {
         this.navCtrl.push('AddProcessPage', { order_parent: this.order_id, edit: 0, is_scanner: 1 }).then(() => { })
      })
   }
   pushPage(page, params = {}) {
      var nav = this.navCtrl.last();
      this.navCtrl.push(page, params).then(() => {
         this.navCtrl.removeView(nav, { animate: false });
      }).then(() => {
      });
   }
   submit() {
      this.httpService.SpecialMachiningMachiningAddToCart().then((res) => {
         if (res.status) {
            this.native.showToast('提交成功');
            if (res.paid == 1) {
               this.navCtrl.push('AccountProcessPage', { log_id: res.log_id, type: 'mach' }).then((res) => {
                  this.navCtrl.getViews().forEach(element => {
                     if (element.id == 'AddProcessScannerPage') {
                        this.navCtrl.removeView(element);
                     }
                  });
               })
            } else {
               this.navCtrl.push('WriteOrdersPage', { scanner: 1 }).then((res) => {
                  this.navCtrl.getViews().forEach(element => {
                     if (element.id == 'AddProcessScannerPage') {
                        this.navCtrl.removeView(element);
                     }
                  });
               })
            }
         }
      })
   }
}
