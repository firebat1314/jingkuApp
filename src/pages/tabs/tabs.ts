import { Component, ViewChild } from '@angular/core';
import { Tabs, Events, IonicPage } from "ionic-angular";
import { HttpService } from "../../providers/http-service";
import { MineProvider } from '../../providers/mine/mine';
import { CustomeServicesProvider } from '../../providers/custome-services/custome-services';

@IonicPage({
   priority: 'high'
})
@Component({
   templateUrl: 'tabs.html'
})
export class TabsPage {
   // this tells the tabs component which Pages
   // should be each tab's root Page
   tab1Root: any = 'HomePage';
   tab2Root: any = 'ClassifyNewPage';
   tab3Root: any = 'CarPage';
   tab4Root: any = 'NewMyPage';
   carNumber: number = 0;

   @ViewChild("tabs") tabs: Tabs;

   constructor(
      public events: Events,
      public httpService: HttpService,
      public mine: MineProvider,
      public customeServ: CustomeServicesProvider,
   ) {

   }
   ionViewCanEnter() {
      return this.mine.getUser().then(res => {
         return true;
      });
   }
   ngOnInit() {
      this.getCarCount();
      this.events.subscribe('car:update', () => {
         this.getCarCount();
      })
      this.httpService.TxImInfo().then(res => {
         if (res.status == 1) {
            this.customeServ.webimLogin({
               // identifier: "ceshi_2891",
               identifier: res.txim.identifier, //当前用户ID,必须是否字符串类型，必填
               // usersig: "eJxlkE1PgzAAhu-8ioYrxrV1xdabOhQWWDSaLezSMGilbOOjLaIx-neVmUji*XmS9*PDAQC4z-HTeZbnTV9bbt9b4YIr4EL37A*2rSp4ZvmFLv5B8dYqLXgmrdAjxIRhCKeKKkRtlVS-Qi5MqTimDE0cU*z5mDMqaA4hIvTS96eKehlhEqS30eMi3ewDP1yYXu96Cjdxp2WaDdstI1FKKpreNFF7qDwcrIeovE4ONig7yCy23qq-2xn-GDbdTJplJVd1QtbxEC-vy4eZF04irTqe7kBkjinFjJEJfRXaqKY*rf7uixBi8Ge68*l8AbEDXmQ_",
               userSig: res.txim.usersig,
               //当前用户身份凭证，必须是字符串类型，必填
               identifierNick: res.txim.user_name, //当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
               headurl: res.txim.avatar //当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
            });
         }
      })
   }
   getCarCount() {
      this.httpService.get_flow_goods_number().then((res) => {//获取购物车数量
         if (res.status == 1) {
            this.carNumber = res.data;
         }
      })
   }
   ngOnDestroy() {
      this.events.unsubscribe('car:update');
   }
   ionViewDidLoad() {
      // console.log(this.tabs);
   }
}