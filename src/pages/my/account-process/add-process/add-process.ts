import { Component, ChangeDetectorRef, Renderer, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, Content, ModalController } from 'ionic-angular';
import { HttpService } from '../../../../providers/http-service';
import { Native } from '../../../../providers/native';
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
   segment: 'add-process/:order_parent/:edit'
})
@Component({
   selector: 'page-add-process',
   templateUrl: 'add-process.html',
})
export class AddProcessPage {
   data: any;
   order_id = this.navParams.get('order_parent');
   edit = this.navParams.get('edit') == 0 ? false : true;
   list: Array<any> = [(new orderParams())];
   @ViewChild(Content) myContent: Content;
   rec_ids: Array<string> = new Array();//已选商品id
   pageswiper: any;

   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public httpService: HttpService,
      public element: ElementRef,
      // public renderer: Renderer,
      // public ref: ChangeDetectorRef,
      public native: Native,
      public modalCtrl: ModalController,
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
   getData() {
      this.httpService.glassMachining({ order_id: this.order_id }).then((res) => {
         if (res.status) {
            this.data = res;
            if (res.machining) {
               this.list = [];
               for (let i = 0; i < res.machining.length; i++) {
                  this.list.push((new orderParams(true)));
                  const element = res.machining[i];

                  if (element.jia_attr) {
                     Object.assign(element.jia_attr, element.frame_attr);
                  }
                  this.list[i].J = element.jia_attr;
                  this.list[i].R = element.right_attr;
                  this.list[i].L = element.left_attr;

                  this.list[i].lzhouxiang = element.eyeglass_cfg.left.zhouxiang;
                  this.list[i].ladd = element.eyeglass_cfg.left.add;
                  this.list[i].ltongju = element.eyeglass_cfg.left.tongju;
                  this.list[i].ltonggao = element.eyeglass_cfg.left.tonggao;
                  this.list[i].ljytj = element.eyeglass_cfg.left.jytj;

                  this.list[i].rzhouxiang = element.eyeglass_cfg.right.zhouxiang;
                  this.list[i].radd = element.eyeglass_cfg.right.add;
                  this.list[i].rtongju = element.eyeglass_cfg.right.tongju;
                  this.list[i].rtonggao = element.eyeglass_cfg.right.tonggao;
                  this.list[i].rjytj = element.eyeglass_cfg.right.jytj;
               }
               console.log(this.list)
            }
            let element = this.element.nativeElement.querySelector('.swiper-container');
            let pagination = this.element.nativeElement.querySelector('.swiper-pagination');
            setTimeout(() => {
               if (this.edit) {
                  this.pageswiper = new Swiper(element, {
                     resistanceRatio:0.9,
                     autoHeight: true,
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
                     slidesOffsetBefore: '8',
                     on: {
                        progress: function (b) {
                           /* for (let i = 0; i < this.slides.length; i++) {
                              let slide = this.slides.eq(i);
                              let slideProgress = this.slides[i].progress;
                              let prevIndent = 4 == i ? .3228 : .0898;
                              let scale = 1 > Math.abs(slideProgress + prevIndent) ? .1 * (1 - Math.abs(slideProgress + prevIndent)) + 1 : 1;
                              slide.transform("scale3d(" + scale + "," + scale + ",1)")
                           } */
                        },
                        setTransition: function (b) {
                           // for (let a = 0; a < this.slides.length; a++) this.slides.eq(a).transition(b)
                        },
                        touchEnd: function () {
                           // -1515 > this.translate && alert("\u8df3\u8f6c")
                        }
                     }
                  })
               }
            }, 300);
         }
      })
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
      this.httpService.is_machining_goods({ order_id: this.order_id, rec_ids: this.rec_ids }).then((res) => {
         if (res.status) {
            this.list.push(new orderParams(true));
            setTimeout(() => {
               this.pageswiper.update();
               this.pageswiper.slideTo(this.list.length - 1);
            }, 300);
            this.list.forEach(e => {
               e.showBody = false;
            });
            /* setTimeout(() => {
               this.myContent.scrollToBottom();
            }, 100); */
         }
      })
   }
   removeOrder(e, index) {
      e.stopPropagation();
      if (!this.list[index].R && !this.list[index].L && !this.list[index].J) {
         this.list.splice(index, 1);
         setTimeout(() => {
            this.pageswiper.update();
         }, 300);
         // this.native.showToast('删除成功');
         this.getRecIds();
      } else {
         if (this.list.length > 1) {
            this.native.openAlertBox('删除加工单', () => {
               this.list.splice(index, 1);
               setTimeout(() => {
                  this.pageswiper.update();
                  this.pageswiper.slideTo(this.list.length - 1);
               }, 300);
               // this.native.showToast('删除成功');
               this.getRecIds();
            });
         } else {
            this.native.showToast('请保留至少一个加工单');
         }
      }
   }
   goChooseLensRPage(item) {
      this.getRecIds();
      let pian_rec = new Array();
      item.R ? pian_rec.push(item.R.rec_id) : null;
      item.L ? pian_rec.push(item.L.rec_id) : null;
      let rec_id = item.R ? item.R.rec_id : null;
      let modal = this.modalCtrl.create('ChooseLensRPage', { order_id: this.order_id, rec_id: rec_id, rec_ids: this.rec_ids, pian_rec: pian_rec }, { cssClass: '' });
      modal.onDidDismiss((data, role) => {
         if (role == 'submit') {
            item.R = data;
            if (data) {
               item.showBody = true;
            }
         }
      })
      modal.present();
      // this.navCtrl.push('ChooseLensRPage',{order_id:this.order_id});
   }
   goChooseLensLPage(item) {
      this.getRecIds();
      let pian_rec = new Array();
      item.R ? pian_rec.push(item.R.rec_id) : null;
      item.L ? pian_rec.push(item.L.rec_id) : null;
      let rec_id = item.L ? item.L.rec_id : null;
      let modal = this.modalCtrl.create('ChooseLensLPage', { order_id: this.order_id, rec_id: rec_id, rec_ids: this.rec_ids, pian_rec: pian_rec }, { cssClass: '' });
      modal.onDidDismiss((data, role) => {
         if (role == 'submit') {
            item.L = data;
            if (data) {
               item.showBody = true;
            }
         }
      })
      modal.present();
      // this.navCtrl.push('ChooseLensLPage',{order_id:this.order_id});

   }
   goChooseFramePage(item) {
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
      let modal = this.modalCtrl.create('ChooseFramePage', {
         order_id: this.order_id,
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
            if (data) {
               item.showBody = true;
            }
         }
      })
      modal.present();
      // this.navCtrl.push('ChooseFramePage',{order_id:this.order_id});

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
   confirm() {
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
            return;
         }
      }
      this.list.forEach(element => {
         cacheMachining.right.push(element.R.rec_id || null);
         cacheMachining.rqiujing.push(element.R.qiujing || null);
         cacheMachining.rzhujing.push(element.R.zhujing || null);
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
            this.navCtrl.push('AddProcessPage', { order_parent: this.order_id, edit: 0 }).then(() => {
            })
         }
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
      this.httpService.insert_machining({ order_id: this.order_id }).then((res) => {
         if (res.status) {
            this.native.showToast('提交成功');
            if (res.paid == 1) {
               this.navCtrl.push('AccountProcessPage', { log_id: res.log_id, type: 'mach' }).then((res) => {
                  this.navCtrl.getViews().forEach(element => {
                     if (element.id == 'AddProcessPage') {
                        this.navCtrl.removeView(element);
                     }
                  });
               })
            } else {
               this.navCtrl.push('PaymentMethodPage', { log_id: res.log_id, type: 'mach' }).then((res) => {
                  this.navCtrl.getViews().forEach(element => {
                     if (element.id == 'AddProcessPage') {
                        this.navCtrl.removeView(element);
                     }
                  });
               })
            }

         }
      })
   }
}
