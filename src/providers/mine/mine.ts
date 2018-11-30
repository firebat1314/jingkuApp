import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../http-service';
import { Native } from '../native';
import { Events } from 'ionic-angular';
import { CustomeServicesProvider } from '../custome-services/custome-services';
import { JpushService } from '../jpush-service';

/*
  Generated class for the MineProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MineProvider {
   canCheckout: boolean;
   showPrice: boolean;
   userInfo: any;
   subject: Subject<any> = new Subject<any>();
   flowGoodsNumer: any;

   constructor(
      private httpServ: HttpService,
      private native: Native,
      private events: Events,
      private customeServ: CustomeServicesProvider,
      private jpushServ: JpushService,
   ) {
      console.log('Hello MineProvider Provider');
      this.httpServ.TxImInfo().then(res => {
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
   get currentUser(): Observable<any> {
      return this.subject.asObservable();
   }
   getUser() {
      return this.httpServ.getByName('userInfo').then((res) => {
         if (res) this.userInfo = res;

         this.httpServ.userInfo().then((res) => {
            if (res.status) {
               this.userInfo = res;

               /* qimo全局配置 */
               window['qimoClientId'] = {
                  userId: res.data.user_info.user_id,
                  nickName: res.data.user_info.user_name
               }

               this.subject.next(this.userInfo);
               this.httpServ.setByName('userInfo', res);

               this.showPrice = res.data.authority.indexOf('1') > -1;//显示商品价格
               this.canCheckout = res.data.authority.indexOf('2') > -1;//结算权限
            }
         })
      });
   }
   get_flow_goods_number() {
      return this.httpServ.get_flow_goods_number().then((res) => {
         if (res.status == 1) {
            this.flowGoodsNumer = res;
            this.events.publish('flow_goods_number', res);
         }
      })
   }
   unsubscribe() {
      // this.subject.unsubscribe()
   }
   changeUser() {
      return this.httpServ.userInfo().then((res) => {
         if (res.status) {
            this.userInfo = res;

            this.jpushServ.setAlias(res.data.user_info.user_name).then(res => {
               console.log('setAlias', res.data.user_info.user_name)
            });
            this.jpushServ.addTags([res.data.user_info.mobile_phone])
            /* qimo全局配置 */
            window['qimoClientId'] = {
               userId: res.data.user_info.user_id,
               nickName: res.data.user_info.user_name
            }
            this.httpServ.setByName('userInfo', res);
            this.showPrice = res.data.authority.indexOf('1') > -1;
            this.canCheckout = res.data.authority.indexOf('2') > -1;
            this.subject.next(res);
         }
      })
   }

}
