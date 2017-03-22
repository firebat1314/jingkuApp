import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Native } from "../../providers/native"; 
import { HttpService } from "../../providers/http-service";

/*
  Generated class for the Car page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-car',
  templateUrl: 'car.html'
})
export class CarPage {
  isEdit:boolean= false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public native: Native,
    public alertCtrl: AlertController,
    public httpService:HttpService
  ) {
      this.httpService.getFlowGoods().then((res) => {
          console.log(res)
      })
   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CarPage');
  }
  showConfirm() {
    let confirm = this.alertCtrl.create({
      cssClass:'alert-style',
      subTitle: '确认删除该商品吗？',
      buttons: [
        {
          text: '取消',
          cssClass:'asdasda',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确认',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ],
    }); 
    confirm.present();
  }
}
