import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpService } from '../../providers/http-service';
import { AdsClickDirective } from '../../directives/ads-click/ads-click';

/**
 * Generated class for the AppAdvertisingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-app-advertising',
  templateUrl: 'app-advertising.html',
  providers: [AdsClickDirective]
})
export class AppAdvertisingPage {
  data: any;
  ads_img: any;
  timer: any;
  timeDown: number = 3;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public httpServ: HttpService,
    public adsClick: AdsClickDirective,
  ) { }

  ngOnInit() {

    this.httpServ.ads({ int_pos_id: '78', size: '1', is_app: '1' }).then(res => {
      if (res.status) {
        this.data = res;
        this.ads_img = res.data[0].ad_img;
        /* let img = new Image();
        img.src = res.data[0].ad_img;
        img.onload = () => {
          this.ads_img = img.src;
        } */
        /* this.getImageDir.dealImage(res.data[0].ad_img,(base)=>{
          console.log(base)
          // this.storage.set('ads_img',base);
          this.ads_img = base;
        }) */
      }
    })
    this.timer = setInterval((e) => {
      if (this.timeDown === 1) {
        this.jumpOver()
      } else {
        --this.timeDown
      }
    }, 1000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppAdvertisingPage');
  }

  ngOnDestroy() {
  }

  jumpOver() {
    clearInterval(this.timer);
    this.storage.get('hasLoggedIn').then((result) => {
      if (result) {
        this.navCtrl.setRoot('TabsPage', {}, { animate: true, animation: 'md-transition', direction: 'forward' });
      } else {
        this.navCtrl.setRoot('LoginPage', {}, { animate: true, animation: 'md-transition', direction: 'forward' });
      }
    });
  }
  clickAds() {
    clearInterval(this.timer);
    if(!this.data.data[0]) return;
    this.storage.get('hasLoggedIn').then((result) => {
      if (result) {
        this.navCtrl.setRoot('TabsPage', {}, { animate: true, animation: 'md-transition', direction: 'forward' },()=>{
          this.adsClick.data = this.data.data[0];
          this.adsClick.onClick()
        });
      } else {
        this.navCtrl.setRoot('LoginPage', {}, { animate: true, animation: 'md-transition', direction: 'forward' });
      }
    });
  };

}
