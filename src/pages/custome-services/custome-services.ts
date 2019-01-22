import { Component, ElementRef, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content } from 'ionic-angular';
import { CustomeServicesProvider, RecentSessMap, InfoMap } from '../../providers/custome-services/custome-services';
import { HttpService } from '../../providers/http-service';
import { Native } from '../../providers/native';

declare var webim: any;
/**
 * Generated class for the CustomeServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
   segment: 'custome-services/:parmas'
})
@Component({
   selector: 'page-custome-services',
   templateUrl: 'custome-services.html',
})
export class CustomeServicesPage {

   parmas: any = JSON.parse(decodeURIComponent(this.navParams.get('parmas')));

   text: string = '';

   title: string = '';


   @ViewChild(Content) content: Content;
   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public ele: ElementRef,
      public customeServ: CustomeServicesProvider,
      public httpServ: HttpService,
      public events: Events,
      public native: Native,
      private renderer: Renderer
   ) {
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad CustomeServicesPage');
   }

   ngOnInit() {
      if (this.parmas.is_other == 1) {
         this.httpServ.newcrmlogin({ fastToken: this.parmas.token }).then(res => {
            if (res.status == 1) {
               this.customeServ.webimLogin({
                  // identifier: "ceshi_2891",
                  identifier: res.txim.identifier, //当前用户ID,必须是否字符串类型，必填
                  // usersig: "eJxlkE1PgzAAhu-8ioYrxrV1xdabOhQWWDSaLezSMGilbOOjLaIx-neVmUji*XmS9*PDAQC4z-HTeZbnTV9bbt9b4YIr4EL37A*2rSp4ZvmFLv5B8dYqLXgmrdAjxIRhCKeKKkRtlVS-Qi5MqTimDE0cU*z5mDMqaA4hIvTS96eKehlhEqS30eMi3ewDP1yYXu96Cjdxp2WaDdstI1FKKpreNFF7qDwcrIeovE4ONig7yCy23qq-2xn-GDbdTJplJVd1QtbxEC-vy4eZF04irTqe7kBkjinFjJEJfRXaqKY*rf7uixBi8Ge68*l8AbEDXmQ_",
                  userSig: res.txim.usersig,
                  //当前用户身份凭证，必须是字符串类型，必填
                  identifierNick: res.txim.name, //当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
                  headurl: res.txim.avatar //当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
               });
               this.events.subscribe('im:login', () => {
                  this.customeServ.onSelSess('GROUP', res.group_id);
               })
               this.parmas.name = res.txim.name;
            }
         })
      } else if (webim.checkLogin()) {
         this.customeServ.onSelSess(this.parmas.selType, this.parmas.selToID);
         this.httpServ.CustomerServiceGroupSource({ group_id: this.parmas.selToID });
      } else {
         this.events.subscribe('im:login', () => {
            this.customeServ.onSelSess(this.parmas.selType, this.parmas.selToID);
            this.httpServ.CustomerServiceGroupSource({ group_id: this.parmas.selToID });
         })
      }
      let msgflow = this.ele.nativeElement.getElementsByClassName("message")[0];

      this.events.subscribe('im:addMsg', () => {
         console.warn('im:addMsg')
         // this.content.scrollToBottom(0);
         msgflow.scrollTop = msgflow.scrollHeight;
      })
      /* if (this.parmas.suppliers_id) {
      this.httpServ.CustomerService({
         order_id: this.parmas.order_id,
         goods_id: this.parmas.goods_id,
         suppliers_id: this.parmas.suppliers_id
      }).then(data => {

      })
   } */
   }
   ngOnDestroy() {
      this.events.unsubscribe('im:addMsg');
      webim.setAutoRead(this.customeServ.selSess, false, false);
   }
   ngAfterViewInit() {
      let msgflow = this.ele.nativeElement.getElementsByClassName("message")[0];

      msgflow.onscroll = () => {
         if (msgflow.scrollTop == 0) {
            msgflow.scrollTop = 10;
            if (this.customeServ.selType == webim.SESSION_TYPE.C2C) {
               // console.log(1)
               this.customeServ.getPrePageC2CHistoryMsgs();
            } else {
               // console.log(2)
               this.customeServ.getPrePageGroupHistoryMsgs();
            }
         }
      }
   }
   sendMsg($t) {
      if (!$t.value) {
         return;
      }
      this.customeServ.onSendMsg($t.value);
      $t.value = '';
   }
   showReSend(msgContent, random) {
      this.native.openAlertBox('重发该消息？', () => {
         this.customeServ.showReSend(msgContent, random);
      });
   }
   selectEmotionImg(selImg) {
      this.text = this.text + selImg[0];
   }
   insertText($t, myValue) {
      if ($t.selectionStart || $t.selectionStart == '0') {
         let startPos = $t.selectionStart;
         let endPos = $t.selectionEnd;
         let scrollTop = $t.scrollTop;
         $t.value = $t.value.substring(0, startPos) + myValue[0] + $t.value.substring(endPos, $t.value.length);
         $t.focus();
         $t.selectionStart = startPos + myValue[0].length;
         $t.selectionEnd = startPos + myValue[0].length;
         $t.scrollTop = scrollTop;
      } else {
         $t.value += myValue[0];
         $t.focus();
      }
   }
}
