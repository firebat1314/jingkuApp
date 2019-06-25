import { Component, ViewChild, ElementRef,OnInit,Renderer2, } from '@angular/core';
import { NavController, ModalController, ViewController, Events, IonicPage, App, Content } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Native } from '../../../providers/native';
import { HttpService } from '../../../providers/http-service';
import { CustomeServicesProvider } from '../../../providers/custome-services/custome-services';
import { ChatProvider } from '../../../providers/chat/chat';
import { XimuProvider } from '../../../providers/ximu/ximu';
import { MineProvider } from '../../../providers/mine/mine';
@IonicPage()
@Component({
   selector: 'page-plus-vip-shopping',
   templateUrl: 'plus_vip_shopping.html'
})
export class plusVipShoppingPage {
   usercount: any;
   userInfo: any;
   baitiao: any;
   plusorderid:any;
   orderids:any;
   @ViewChild(Content)
   @ViewChild('div3') div3:ElementRef;
   receiptTools:boolean;
   myContent: Content;
   usertimes:any;
   constructor(  private renderer2: Renderer2,public viewCtrl: ViewController, public navCtrl: NavController, public modalCtrl: ModalController, public httpService: HttpService, public events: Events, public native: Native, public app: App, private iab: InAppBrowser, private chat: ChatProvider, private ximu: XimuProvider, private mine: MineProvider, private customeServ: CustomeServicesProvider) {
   }
   ionViewDidEnter() {
      this.app.setTitle('个人中心');
   }
 
   ionViewDidLoad() {
      console.log('ionViewDidLoad plusVipShoppingPage');
   }
   ngOnInit() {
      this.plusindexs();
      this.yikaotongxufei()
      // this.aaa()
   }
   zhifu(){
      debugger
      // if(this.receiptTools==false){

      //    this.native.showToast('请选择需要关注商品');
      // }
      if(this.orderids==undefined){
         this.orderids=116555
      }
      return this.httpService.plusPayment({"id":this.orderids}).then((res)=>{
            if(res.status==1){
               this.plusorderid=res.response.order_id
            }
              
      // this.events.publish('car:update');
      // this.events.publish('my:update');
            var view = this.viewCtrl;
            this.navCtrl.push('PaymentMethodPage', { order_id: this.plusorderid,og_id: '', isDistribution: 0 }).then(() => {
               this.navCtrl.removeView(view);
            });
      })
      // this.navCtrl.push("unregisteredPluseInfoPage")
      
   }
   
   yikaotongxufei(){
      debugger
      return this.httpService.yikaotong().then((res)=>{
       this.usertimes=res.response.info.info//个人信息
      })
    }
   kaimg:any;
   morenjiage:any;
   plusindexs(){
      return this.httpService.plusindex().then((res)=>{
         if(res.status==1){
            this.kaimg=res.response.service.plus
            this.morenjiage=this.kaimg[0].price_format
         }
      
      })
   }  
   idss:any=0;
   price_formats:any;
   aaa(index,price_format,order_id){
     
      this.price_formats=price_format
      debugger
     this.idss=index
     this.orderids=order_id;
    
   }
   gotopluspage(){
      this.navCtrl.push('plus_duihuanPage')
   }
   gotoplusinfo(){
      this.navCtrl.push('plusInfoPage') //未开通
      this.navCtrl.push('unregisteredPluseInfoPage')  //已开通
   }
   //点击去合同
   gotohetong(){
      this.navCtrl.push('plushetongPage')
   }
}
