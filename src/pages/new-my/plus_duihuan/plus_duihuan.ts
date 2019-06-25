
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
  selector: 'page_plus_duihuan',
  templateUrl: 'plus_duihuan.html',
})
export class plus_duihuanPage {
  duihuanma:any;
  usercount: any;
   userInfo: any;
   baitiao: any;
   @ViewChild(Content)
   myContent: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpService, public native: Native, public events: Events) { }
  ngOnInit() {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceOrderDetailsPage');
  }
  exchangess(){
    return this.httpService.exchanges({code:this.duihuanma}).then((res)=>{
      if(res.status==1){
        this.native.showToast('兑换成功');
        this.navCtrl.push('NewMyPage')
      }
      // else{
      //   this.native.showToast('');
      // }
    })
  }

}