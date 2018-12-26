import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Native } from '../native';
import { HttpService } from '../http-service';
import { CustomeServicesProvider } from '../custome-services/custome-services';
import { App } from 'ionic-angular';

declare let qimoChatClick;
declare var cordova: any;
/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ChatProvider {

   constructor(
      public native: Native,
      public httpService: HttpService,
      public customeServ: CustomeServicesProvider,
      private app: App,
   ) {
      console.log('Hello ChatProvider Provider');
   }
   webim(params?: { supplier_id?: any; goods_id?: number; cutId?: any; dId?: any; isActivity?: number; order_id?: any; }, cbok?: any) {
      console.log(this.customeServ.recentSessMap)
      this.httpService.CustomerService(params || {}, { showLoading: true }).then(res => {
         if (res.status == 1) {
            // this.customeServ.initRecentContactList(() => {
            if (params) {
               this.httpService.CustomerServiceCustom({
                  order_id: params.order_id,
                  goods_id: params.goods_id,
                  suppliers_id: params.supplier_id,
                  group_id: this.customeServ.selType == 'GROUP' ? res.group_id : undefined,
                  identifier: this.customeServ.loginInfo.identifier,
               }).then(res => {

               })
            }
            if (res.group_id) {
               this.customeServ.initInfoMapByMyGroups(() => {
                  this.app.getActiveNav().push('CustomeServicesPage', { parmas: encodeURIComponent(JSON.stringify(this.customeServ.infoMap['GROUP_' + res.group_id])) })
               })
            } else if (res.userId) {
               this.customeServ.initInfoMapByMyFriends(() => {
                  this.app.getActiveNav().push('CustomeServicesPage', { parmas: encodeURIComponent(JSON.stringify(this.customeServ.infoMap['C2C_' + res.userId])) })
               })
            }
            // }, () => { });
         }
      })
   }
   qimoChatClick(options?: any) {
      this.native.showLoading();
      if (old) old.parentNode.removeChild(old);
      var old = document.getElementsByClassName('qimo')[0]
      let qimo: HTMLScriptElement = document.createElement('script');
      qimo.type = 'text/javascript';
      qimo.src = 'https://webchat.7moor.com/javascripts/7moorInit.js?accessId=' + (options && options.access_id || 'b441f710-80d9-11e7-8ddd-b18e4f0e2471') + '&autoShow=false';
      console.log(options && options.access_id, qimo.src)
      qimo.className = 'qimo';
      document.getElementsByTagName('body')[0].appendChild(qimo);
      let that = this;
      qimo.onload = qimo['onreadystatechange'] = function () {
         that.native.hideLoading();
         if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
            setTimeout(function () {
               qimoChatClick();
            }, 1500);
            qimo.onload = qimo['onreadystatechange'] = null;
         }
      };
   }
   qimoChatSDK(access_id?, supplier_name?, supplier_avatar?, successCallback?) {
      if (typeof cordova != "undefined") {
         this.httpService.getByName('userInfo').then((userInfo) => {
            cordova.exec(
               (response) => {
                  if (typeof response !== 'object') { response = JSON.parse(response); }
                  successCallback ? successCallback(response) : null;
               },
               (msg) => {
                  this.native.showToast(msg, null, true);
               },
               "ShowMessage",
               "mydream", [(userInfo.data.avatar || '出错'), (userInfo.data.user_info.user_id || '出错'), (userInfo.data.user_info.user_name || '出错'), (access_id || 'b441f710-80d9-11e7-8ddd-b18e4f0e2471'), supplier_name || '镜库网', supplier_avatar || 'https://m.jingku.cn/assets/icon/avatar_default.jpg'])
         });
      } else {
         this.native.showLoading();
         if (old) old.parentNode.removeChild(old);
         var old = document.getElementsByClassName('qimo')[0]
         let qimo: HTMLScriptElement = document.createElement('script');
         qimo.type = 'text/javascript';
         qimo.src = 'https://webchat.7moor.com/javascripts/7moorInit.js?accessId=' + (access_id || 'b441f710-80d9-11e7-8ddd-b18e4f0e2471') + '&autoShow=false';
         qimo.className = 'qimo';
         document.getElementsByTagName('body')[0].appendChild(qimo);
         let that = this;
         qimo.onload = qimo['onreadystatechange'] = function () {
            that.native.hideLoading();
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
               setTimeout(function () {
                  qimoChatClick();
               }, 1500);
               qimo.onload = qimo['onreadystatechange'] = null;
            }
         };
      }
   }
}
