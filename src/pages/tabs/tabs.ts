import { Component, ViewChild } from '@angular/core';
import { Tabs, Events, IonicPage, AlertController, NavController, ModalController } from "ionic-angular";
import { HttpService } from "../../providers/http-service";
import { MineProvider } from '../../providers/mine/mine';
import { Native } from '../../providers/native';

@IonicPage({
   priority: 'high'
})
@Component({
   templateUrl: 'tabs.html'
})
export class TabsPage {
   // this tells the tabs component which Pages
   // should be each tab's root Page
   tab1Root: any = 'HomePage';
   tab2Root: any = 'ClassifyNewPage';
   tab3Root: any = 'CarPage';
   tab4Root: any = 'NewMyPage';
   carNumber: number = 0;

   @ViewChild("tabs") tabs: Tabs;

   constructor(
      private events: Events,
      private httpService: HttpService,
      private mine: MineProvider,
      private alertCtrl: AlertController,
      private native: Native,
      private navCtrl: NavController,
      private modalCtrl: ModalController
   ) {

   }
   ionViewCanEnter() {

   }
   ngOnInit() {
      this.getCarCount();
      this.events.subscribe('car:update', () => {
         this.getCarCount();
      })
      /* this.mine.currentUser.subscribe(data => {
        this.httpService.setByName('userInfo', data);
      }) */
      this.mine.changeUser();

      if (this.native.isMobile()) {
         this.httpService.getStorage('watched_privacy_policy').then(res => {
            if (!res) {
               this.httpService.helpInfo({ id: 40 }, { showLoading: false }).then((res) => {
                  if (res.status == 1) {
                     this.alertCtrl.create({
                        cssClass: 'privacy_policy',
                        title: '镜库隐私政策概要',
                        message: res.data.description + `<div class="look_privacy_policy">前往查看完整版<span class="privacy_policy_a">《镜库隐私政策》</span></div>`,
                        enableBackdropDismiss: false,
                        buttons: [{
                           text: '不同意',
                           handler: () => {
                              this.alertCtrl.create({
                                 subTitle: '您需要同意《镜库隐私政策》方可使用此软件',
                                 buttons: [{
                                    text: '我知道了',
                                 }]
                              }).present();
                              return false;
                           }
                        }, {
                           text: '同意',
                           handler: () => {
                              this.httpService.setStorage('watched_privacy_policy', true);
                           }
                        }]
                     }).present().then(() => {
                        let btn: any = document.querySelector('.privacy_policy_a');
                        btn.onclick = () => {
                           this.modalCtrl.create('HelperDetailsPage', {
                              article_id: 40,
                              is_modal: true
                           }).present();
                        }
                     });
                  }
               })
            }
         })
      }
   }
   getCarCount() {
      this.httpService.get_flow_goods_number().then((res) => {//获取购物车数量
         if (res.status == 1) {
            this.carNumber = res.data;
         }
      })
   }
   ngOnDestroy() {
      this.events.unsubscribe('car:update');
   }
   ionViewDidLoad() {
      // console.log(this.tabs);
   }
}