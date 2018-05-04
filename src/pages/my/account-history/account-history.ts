import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, AlertController, IonicPage, Events } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { MineProvider } from '../../../providers/mine/mine';

/*
  Generated class for the AccountHistory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-account-history',
  templateUrl: 'account-history.html'
})
export class AccountHistoryPage {
  data: any;
  showCheckBox: boolean = false;
  @ViewChild(Content) content: Content;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public alertCtrl: AlertController,
    public events: Events,
    public mine: MineProvider,
  ) {
    this.getHttpData()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountHistoryPage');
  }
  showCheckBoxChange() {
    this.showCheckBox = !this.showCheckBox;
    this.content.resize();
  }
  getHttpData(finish?) {
    this.httpService.watch().then((res) => {
      if (res.status) { this.data = res; }
      if (finish) { finish() }
    })
  }
  /*下拉刷新*/
  doRefresh(refresher) {
    this.getHttpData(function () {
      setTimeout(() => {
        refresher.complete();
      }, 500);
    })
  }
  deleteOne(id) {
    let confirm = this.alertCtrl.create({
      cssClass: 'alert-style',
      title: '确认删除该浏览记录',
      buttons: [
        {
          text: '确认',
          handler: () => {
            console.log('Agree clicked');
            this.httpService.delWatch({ goods_ids: [id] }).then((res) => {
              // console.log(res);
              this.getHttpData();
              this.events.publish('my:update');
            })
          }
        },
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
      ],
    });
    confirm.present();
  }
  deleteSelected() {
    let confirm = this.alertCtrl.create({
      cssClass: 'alert-style',
      subTitle: '确认删除该浏览记录',
      buttons: [
        
        {
          text: '确认',
          handler: () => {
            console.log('Agree clicked');
            var arr = [];
            for (var i = 0, item = this.data.data; i < item.length; i++) {
              if (item[i].selected == 1) {
                arr.push(item[i].goods_id)
              }
            }
            // console.log(arr)
            this.httpService.delWatch({ goods_ids: arr }).then((res) => {
              // console.log(res);
              this.getHttpData();
            })
          }
        },
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
      ],
    });
    confirm.present();
  }
  goParticularsPage(id) {
    if (!this.showCheckBox) {
      this.navCtrl.push('ParticularsPage', { goodsId: id })
    }
  }
}
