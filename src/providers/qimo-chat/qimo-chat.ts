import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Native } from '../native';
import { HttpService } from '../http-service';

declare let qimoChatClick;
declare var cordova: any;
/*
  Generated class for the QimoChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class QimoChatProvider {

   constructor(
      public native: Native,
      public httpService: HttpService,
   ) {
      console.log('Hello QimoChatProvider Provider');
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
      this.native.showToast('该功能整改中^-^');
      /* if (typeof cordova != "undefined") {
         this.httpService.getByName('userInfo').then((userInfo) => {
            cordova.exec(
               (response) => {
                  if (typeof response !== 'object') { response = JSON.parse(response); }
                  successCallback ? successCallback(response) : null;
               },
               (msg) => {
                  this.native && this.native.showToast(msg, null, true);
               },
               "ShowMessage",
               "mydream", [
                  (userInfo.data.avatar || 'error'),
                  (userInfo.data.user_info.user_id || 'error'),
                  (userInfo.data.user_info.user_name || 'error'),
                  (access_id || 'b441f710-80d9-11e7-8ddd-b18e4f0e2471'),
                  (supplier_name || '镜库网'),
                  (supplier_avatar || 'https://m.jingku.cn/assets/icon/avatar_default.jpg')])
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
      } */
   }
}
