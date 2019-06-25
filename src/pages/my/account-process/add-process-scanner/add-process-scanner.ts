import { Component, ChangeDetectorRef, Renderer, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, Content, ModalController,FabButton } from 'ionic-angular';
import { HttpService } from '../../../../providers/http-service';
import { Native } from '../../../../providers/native';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AccountProcessProvider } from '../account-process-provider';
import Swiper from 'swiper';

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
   segment: 'add-process-scanner/:edit'
})
@Component({
   selector: 'page-add-process-scanner',
   templateUrl: 'add-process-scanner.html',
})
export class AddProcessScannerPage {
   suoquList: any;
   invoiceList: any;
   invRoleList: any;
   receiptTool: any = 'receiptSskFor';//or receiptSskFor or receiptList or receiptInfo
   data: any;
   edit = this.navParams.get('edit') == 0 ? false : true;
   list: Array<any> = [(new orderParams(true))];
   rec_ids: Array<string> = new Array();//已选商品id

   @ViewChild(Content) myContent: Content;
   @ViewChild(FabButton) fabButton: FabButton
   flag: any;
   pageswiper: any;
   hasBackBtn: boolean = false;
   itemlist:any;
   constructor(
      private navCtrl: NavController,
      private navParams: NavParams,
      private httpService: HttpService,
      private native: Native,
      private modalCtrl: ModalController,
      private ib: InAppBrowser,
      private thisProvider: AccountProcessProvider,
      public element: ElementRef,
   ) {
   }
   scannerData: any = this.navParams.get('scannerData');
   ionViewDidLoad() {
      console.log('ionViewDidLoad AddProcessPage');
   }
   ngOnInit() {
    
      // if (this.navCtrl.length()!=1) {
      //    this.hasBackBtn = true;
      // }
      // if()
      this.getData();
this.ass()
 
   }

   ass(){
           if(this.navParams.data.data !=undefined){
         this.itemlist=this.navParams.data.data
         console.log(this.itemlist)
      }
   }
   // ngAfterViewInit() {
   //    /* 回到顶部按钮 */
   //    this.fabButton.setElementClass('fab-button-out', true);
   //    this.myContent.ionScroll.subscribe((d) => {
   //      this.fabButton.setElementClass("fab-button-in", d.scrollTop >= d.contentHeight);
   //    });
   //  }

   processing(){
      alert(1111)
   }
   /**
    * 获取已保存加工单信息
    * @param index 加工单下标
    */
   getData(index?, showLoading = false) {
      this.httpService.SpecialMachiningmachining_info({}, { showLoading: showLoading }).then((res) => {//{is_ceshi:1}
         if (res.status == 1 && res.machining.length) {
            this.data = res;
            this.list = [];
            for (let i = 0; i < res.machining.length; i++) {
               if (res.machining.length > 1) {
                  this.list[i] = (new orderParams(false));
               } else {
                  this.list[i] = (new orderParams(true));
               }
               const element = res.machining[i];

               if (element.jia_attr) {
                  Object.assign(element.jia_attr, element.frame_attr);
               }
               this.list[i].J = element.jia_attr;
               this.list[i].R = element.right_attr;
               this.list[i].L = element.left_attr;

               if (element.eyeglass_cfg) {
                  if (element.eyeglass_cfg.left) {
                     this.list[i].lzhouxiang = element.eyeglass_cfg.left.zhouxiang;
                     this.list[i].ladd = element.eyeglass_cfg.left.add;
                     this.list[i].ltongju = element.eyeglass_cfg.left.tongju;
                     this.list[i].ltonggao = element.eyeglass_cfg.left.tonggao;
                     this.list[i].ljytj = element.eyeglass_cfg.left.jytj;
                  }
                  if (element.eyeglass_cfg.right) {
                     this.list[i].rzhouxiang = element.eyeglass_cfg.right.zhouxiang;
                     this.list[i].radd = element.eyeglass_cfg.right.add;
                     this.list[i].rtongju = element.eyeglass_cfg.right.tongju;
                     this.list[i].rtonggao = element.eyeglass_cfg.right.tonggao;
                     this.list[i].rjytj = element.eyeglass_cfg.right.jytj;
                  }
               }
               console.log(this.list)
            }
            let element = this.element.nativeElement.querySelector('.swiper-container');
            let pagination = this.element.nativeElement.querySelector('.swiper-pagination');
            setTimeout(() => {
               if (this.pageswiper) {
                  this.pageswiper.update();
                  return;
               }
               if (this.edit) {
                  this.pageswiper = new Swiper(element, {
                     autoHeight: true,
                     resistanceRatio: 0.9,
                     pagination: {
                        el: pagination,
                     }
                  })
               } else {
                  this.pageswiper = new Swiper(element, {
                     pagination: {
                        el: pagination,
                     },
                     slidesPerView: "auto",
                  })
               }
            }, 300);
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
   userBonus() {
      this.modalCtrl.create('ProcessCouponPage', {
         data: this.data.suppliers_list,
         is_scanner: true,
         callback: () => {
            this.getData(0, false);
         }
      }).present();
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
            this.pageswiper.update();
            this.pageswiper.slideTo(this.list.length - 1);
         }, 300);
      })

   }
   removeOrder(e, index) {
      e.stopPropagation();
      if (!this.list[index].R && !this.list[index].L && !this.list[index].J) {
         this.list.splice(index, 1);
         // this.native.showToast('删除成功');
         this.getRecIds();
         setTimeout(() => {
            this.pageswiper.update();
         }, 300);
      } else {
         if (this.list.length > 1) {
            this.native.openAlertBox('删除加工单', () => {
               this.httpService.SpecialMachiningdel({ marking: index }).then(res => {
                  if (res.status == 1) {
                     this.list.splice(index, 1);
                     this.getRecIds();
                     setTimeout(() => {
                        this.pageswiper.update();
                        this.pageswiper.slideTo(this.list.length - 1);
                     }, 300);
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
      let modal = this.modalCtrl.create('ChooseLensRPage', { rec_id: rec_id, rec_ids: this.rec_ids, pian_rec: pian_rec, scannerData: item.R, scannerIndex: index, });
      modal.onDidDismiss((data, role) => {
         if (role == 'submit') {
            item.showBody = true;
            this.getData(index);
            // item.R = data;
         }
      })
      modal.present();
   }
   goChooseLensRPagelist(item) {
      this.getRecIds();
      let pian_rec = new Array();
      item.R ? pian_rec.push(item.R.rec_id) : null;
      item.L ? pian_rec.push(item.L.rec_id) : null;
      let rec_id = item.R ? item.R.rec_id : null;
      // this.navCtrl.push('ChooseLensRPage',{goChooseLensRPagelist:111111});
      // let modal = this.modalCtrl.create('AdddOrdersPage',{goChooseLensRPagelist:111111}, { cssClass: '' });
    this.navCtrl.push("AdddOrdersPage",{oder_id:item.order_id})
      // this.navCtrl.push('AdddOrdersPage');
   }
  
   order_ids:number
   goChooseLensLPagelist(item){
            debugger
         this.getRecIds();
         let pian_rec = new Array();
         item.R ? pian_rec.push(this.itemlist.rec_id) : null;
         item.L ? pian_rec.push(this.itemlist.rec_id) : null;
         let rec_id = item.L ? item.L.rec_id : null;
        let  order_id= this.itemlist.order_parent;
         let modal = this.modalCtrl.create('ChooseLensLPage', { order_id: order_id, rec_id: rec_id, rec_ids: this.itemlist.rec_id, pian_rec: this.itemlist.rec_id }, { cssClass: '' });
         modal.onDidDismiss((data, role) => {
            if (role == 'submit') {
               if (data.is_cutting == 1) {//切边商品选择一个自动填充其他
   
                  item.R = data.cutting.R;
                  item.L = data.cutting.L;
                  item.J = data.cutting.jia;
   
                  pian_rec = [];
                  pian_rec.push(item.R.rec_id)
                  pian_rec.push(item.L.rec_id)
   
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
   
                  let modal = this.modalCtrl.create('PopoverMachiningPage', {
                     rec_id: rec_id,
                     mach_type: mach_type,
                     pinpai: pinpai,
                     xinghao: xinghao,
                     beizhu: beizhu,
                     pian_rec: pian_rec
                  }, { cssClass: '' });
                  modal.onDidDismiss((data, role) => {
                     if (data) {
                        item.J = data;
                        setTimeout(() => {
                           // this.pageswiper.update();
                        }, 300);
                     }
                  })
   
                  setTimeout(() => {
                     modal.present();
                  }, 800);
   
               } else {
                  item.L = data.data;
               }
               setTimeout(() => {
                  // this.pageswiper.update();
               }, 300);
            }
         })
         modal.present();
         // this.navCtrl.push('ChooseLensLPage',{order_id:this.order_id});
   
      
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
      let modal = this.modalCtrl.create('ChooseLensLPage', { rec_id: rec_id, rec_ids: this.rec_ids, pian_rec: pian_rec, scannerData: item.L, scannerIndex: index, });
      modal.onDidDismiss((data, role) => {
         if (role == 'submit') {
            item.showBody = true;
            this.getData(index);
            // item.L = data;
         }
      })
      modal.present();
   }
   goChooseFramelistPage(item) {
      this.getRecIds();
      let pian_rec = new Array();
      item.R ? pian_rec.push(item.R.rec_id) : null;
      item.L ? pian_rec.push(item.L.rec_id) : null;
      if (pian_rec.length <= 1) {
         this.native.showToast('请选择镜片');
         return
      }
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
      let  order_id= item.R? item.R.order_id:null
      let modal = this.modalCtrl.create('ChooseFramePage', {
         order_id: order_id,
         rec_id: rec_id,
         rec_ids: this.rec_ids,
         pian_rec: pian_rec,
         mach_type: mach_type,
         pinpai: pinpai,
         xinghao: xinghao,
         beizhu: beizhu,
      }, { cssClass: '' });
      modal.onDidDismiss((data, role) => {
         if (role == 'submit') {
            item.J = data;
            setTimeout(() => {
               // this.pageswiper.update();
            }, 300);
         }
      })
      modal.present();
      // this.navCtrl.push('ChooseFramePage',{order_id:this.order_id});

   }
   goChooseFramePage(item, index, type) {
      if (!item.k) {
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
         rec_id: rec_id,
         rec_ids: this.rec_ids,
         pian_rec: pian_rec,
         mach_type: mach_type,
         pinpai: pinpai,
         xinghao: xinghao,
         beizhu: beizhu,
         scannerData: item.J,
         scannerIndex: index,
         settings: this.data.settings
      });
      modal.onDidDismiss((data, role) => {
         if (role == 'submit') {
            item.showBody = true;
            item.J = data;
         }
      })
      modal.present();
   }




   goChooseFramelistsPage(item) {
      this.getRecIds();
      let pian_rec = new Array();
      item.R ? pian_rec.push(this.itemlist.rec_id) : null;
      item.L ? pian_rec.push(item.L.rec_id) : null;
      if (pian_rec.length < 1) {
         this.native.showToast('请选择镜片');
         return
      }
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
         order_id: this.itemlist.order_parent,
         rec_id: rec_id,
         rec_ids: this.rec_ids,
         pian_rec: pian_rec,
         mach_type: mach_type,
         pinpai: pinpai,
         xinghao: xinghao,
         beizhu: beizhu,
      }, { cssClass: '' });
      modal.onDidDismiss((data, role) => {
         if (role == 'submit') {
            item.J = data;
            setTimeout(() => {
               this.pageswiper.update();
            }, 300);
         }
      })
      modal.present();
      // this.navCtrl.push('ChooseFramePage',{order_id:this.order_id});

   }
   cache_machining() {
      return new Promise((resolve, reject) => {
         var cacheMachining = {
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
            if (!this.itemlist || !element.L || !element.J) {
               return this.native.showToast('请完善加工单' + (index + 1) + '信息');
            }
         }
         this.list.forEach(element => {
            cacheMachining.right.push(this.itemlist.goods_id || null);
            cacheMachining.rqiujing.push(this.itemlist.qiujing || null);
            cacheMachining.rzhujing.push(this.itemlist.zhujing || null);
            cacheMachining.rzhouxiang.push(element.rzhouxiang || null);
            cacheMachining.radd.push(element.radd || null);
            cacheMachining.rtongju.push(element.rtongju || null);
            cacheMachining.rtonggao.push(element.rtonggao || null);
            cacheMachining.rjytj.push(element.rjytj || null);

            cacheMachining.left.push(element.L.goods_id || null);
            cacheMachining.lqiujing.push(element.L.qiujing || null);
            cacheMachining.lzhujing.push(element.L.zhujing || null);
            cacheMachining.lzhouxiang.push(element.lzhouxiang || null);
            cacheMachining.ladd.push(element.ladd || null);
            cacheMachining.ltongju.push(element.ltongju || null);
            cacheMachining.ltonggao.push(element.ltonggao || null);
            cacheMachining.ljytj.push(element.ljytj || null);

            cacheMachining.jia.push(element.J.goods_id || null);
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
      if(this.itemlist !=undefined){
        

         var cacheMachining = {
            order_id: this.itemlist.order_parent,
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
            if (!this.itemlist || !element.L || !element.J) {
               this.native.showToast('请完善加工单' + (index + 1) + '信息');
               return;
            }
         }
         this.list.forEach(element => {
            cacheMachining.right.push(this.itemlist.rec_id || null);
            cacheMachining.rqiujing.push(this.itemlist.qiujing || null);
            cacheMachining.rzhujing.push(this.itemlist.zhujing || null);
            cacheMachining.rzhouxiang.push(element.rzhouxiang || null);
            cacheMachining.radd.push(element.radd || null);
            cacheMachining.rtongju.push(element.rtongju || null);
            cacheMachining.rtonggao.push(element.rtonggao || null);
            cacheMachining.rjytj.push(element.rjytj || null);
   
            cacheMachining.left.push(element.L.rec_id || null);
            cacheMachining.lqiujing.push(element.L.qiujing || null);
            cacheMachining.lzhujing.push(element.L.zhujing || null);
            cacheMachining.lzhouxiang.push(element.lzhouxiang || null);
            cacheMachining.ladd.push(element.ladd || null);
            cacheMachining.ltongju.push(element.ltongju || null);
            cacheMachining.ltonggao.push(element.ltonggao || null);
            cacheMachining.ljytj.push(element.ljytj || null);
   
            cacheMachining.jia.push(element.J.rec_id || null);
            cacheMachining.mach_type.push(element.J.mach_type || null);
            cacheMachining.chebiao.push(element.J.chebiao || null);
            cacheMachining.beizhu.push(element.J.beizhu || null);
            cacheMachining.xinghao.push(element.J.xinghao || null);
            cacheMachining.pinpai.push(element.J.pinpai || null);
         });
         this.httpService.cache_machining(cacheMachining).then((res) => {
            if (res.status) {
               this.navCtrl.push('AddProcessPage', { order_parent: this.itemlist.order_parent, edit: 0 }).then(() => {
               })
            }
         })
      }
     else{
        debugger
      this.cache_machining().then((res) => {
         this.navCtrl.push('AddProcessScannerPage', { edit: 0 }).then(() => { })
      })
     }
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
