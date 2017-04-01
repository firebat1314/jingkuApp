import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, AlertController } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";

/*
  Generated class for the AccountHistory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
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
    public alertCtrl: AlertController
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
      console.log('个人中心浏览记录', res)
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
      subTitle: '确认删除该浏览记录吗？',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确认',
          handler: () => {
            console.log('Agree clicked');
            this.httpService.delWatch({ goods_ids: [id] }).then((res) => {
              console.log(res);
              this.getHttpData();
            })
          }
        }
      ],
    });
    confirm.present();
  }
  deleteSelected() {
    let confirm = this.alertCtrl.create({
      cssClass: 'alert-style',
      subTitle: '确认删除选中浏览记录吗？',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
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
            console.log(arr)
            this.httpService.delWatch({ goods_ids: arr }).then((res) => {
              console.log(res);
              this.getHttpData();
            })
          }
        }
      ],
    });
    confirm.present();
  }
}
