
import { Component, ViewChild } from '@angular/core';
import { IonicPage, Content } from 'ionic-angular';
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
  selector: 'page_unregistered_pluse_info',
  templateUrl: 'unregistered_pluse_info.html',
})
export class unregisteredPluseInfoPage {
  usercount: any;
   userInfo: any;
   baitiao: any;
   usertimes:any;
   userbonus:any
   usershipping:any;
   @ViewChild(Content)
   myContent: Content;
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
  yikaotongxufei(){
    return this.httpService.yikaotong().then((res)=>{
     this.userInfo=res.response.info.user//个人信息
     this.usertimes=res.response.info.info //个人
     this.usershipping=res.response.shipping     //运费券
     this.userbonus=res.response.bonus    //优惠券
     console.log(this.userbonus[0].total)
     debugger
     console.log(this.usertimes.end_time)
     debugger
    })
  }
  //领取优惠券
  getPrivilege(item) {
    debugger
       this.native.openAlertBox('确认领取优惠券', () => {
          this.httpService.plusbonus({ id: item }).then((res) => {
             if (res.status == 1) {
                this.native.showToast('领取优惠券成功');
                this.yikaotongxufei()
             }
          })
       })
    
 }
//  去往续费页面
gotoplus(){
  this.navCtrl.push('plusVipShoppingPage')
}
//去往兑换码页面
gotopluspage(){
  this.navCtrl.push('plus_duihuanPage')
}
}