
import { Component, ViewChild } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from '../../../providers/native';
import { NavController, NavParams, Events } from 'ionic-angular';
/**
 * Generated class for the ServiceOrderDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
})
@Component({
  selector: 'page_plus_info',
  templateUrl: 'plus_info.html',
})
export class plusInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpService, public native: Native, public events: Events) { }
  ngOnInit() {
    this.yikaotongxufei()
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceOrderDetailsPage');
  }
  csdds() {
    this.navCtrl.push('chooseaftersalegoodsPage');
    // alert(111)
  }
  //优惠券
  usershipping:any;
  userbonus:any;
  yikaotongxufei(){
    return this.httpService.plusviwe().then((res)=>{
     this.usershipping=res.response.shipping     //运费券
     this.userbonus=res.response.bonus    //优惠券
     console.log(this.userbonus[0].total)
     debugger
    })
  }
  gotomoney(){
    this.navCtrl.push('plusVipShoppingPage')
  }
}