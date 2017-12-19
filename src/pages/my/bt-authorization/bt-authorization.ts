import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, Events } from 'ionic-angular';
import { HttpService } from '../../../providers/http-service';
import { XimuProvider } from '../../../providers/ximu/ximu';

/**
 * Generated class for the BtAuthorizationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bt-authorization',
  templateUrl: 'bt-authorization.html',
})
export class BtAuthorizationPage {
  baitiao: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    private ximu: XimuProvider,
    private events: Events,
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BtAuthorizationPage');
  }

  ngOnInit() {
    this.events.subscribe('userInfo:editOk', () => {
      this.getData();
    })
    this.getData();
  }
  getData() {
    this.httpService.baitiao_b().then((res) => {
      if (res.status) {
        this.baitiao = res;
      }
    })
  }
  jihuo() {
    this.httpService.XimuUserapply().then((res) => {
      if (res.status) {
        this.ximu.openXimu(res.data.url);
      } else {
        this.navCtrl.goToRoot({ animate: true });
      }
    })
  }
}
