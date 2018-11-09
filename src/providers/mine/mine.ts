import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../http-service';
import { Native } from '../native';
import { Events } from 'ionic-angular';

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
   ) {
      console.log('Hello MineProvider Provider');
   }
   get currentUser(): Observable<any> {
      return this.subject.asObservable();
   }
   getUser() {
      if (!this.userInfo) {
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
      } else {
         this.subject.next(this.userInfo);
      }
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
      this.httpServ.userInfo().then((res) => {
         if (res.status) {
            this.userInfo = res;

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
