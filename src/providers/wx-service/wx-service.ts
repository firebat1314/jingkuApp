import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpService } from '../http-service';
import { Native } from '../native';
import { IP } from '../constants';

declare var wx: any;

export interface wxOptions {

   title?; // 分享标题

   desc?; // 分享描述

   link?; // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

   imgUrl?; // 分享图标

   type?; // 分享类型,music、video或link，不填默认为link

   dataUrl?; // 如果type是music或video，则要提供数据链接，默认为空

   success?;

   cancel?;
}
/*
  Generated class for the WxServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class WxServiceProvider {

   constructor(public httpService: HttpService, public native: Native, ) {
      console.log('Hello WxServiceProvider Provider');
   }

   config(wxOptions?: wxOptions) {
      if (!this.native.isWeixin()) {
         return;
      }
      let that = this;
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            this.httpService.weixinfenx({ url: location.href }).then((res) => {
               if (res.status) {
                  wx&&wx.config({
                     debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                     appId: res.data.appId, // 必填，公众号的唯一标识
                     timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                     nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                     signature: res.data.signature,// 必填，签名，见附录1
                     jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'onMenuShareQZone'
                     ] //  
                  });
                  wx&&wx.ready(function () {
                     resolve()
                     wx&&wx.onMenuShareTimeline({
                        title: wxOptions.title, // 分享标题
                        link: wxOptions.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: IP + "/assets/icon/jingku_logo.png", // 分享图标
                        success: function () {
                           // 用户确认分享后执行的回调函数
                           that.native.showToast('分享成功');
                        },
                        cancel: function () {
                           // 用户取消分享后执行的回调函数
                           that.native.showToast('取消分享');
                        }
                     });
                     wx&&wx.onMenuShareAppMessage({
                        title: wxOptions.title, // 分享标题
                        desc: wxOptions.desc, // 分享描述
                        link: wxOptions.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: IP + "/assets/icon/jingku_logo.png", // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                           // 用户确认分享后执行的回调函数
                           that.native.showToast('分享成功');
                        },
                        cancel: function () {
                           // 用户取消分享后执行的回调函数
                           that.native.showToast('取消分享');
                        }
                     });
                     wx&&wx.onMenuShareQQ({
                        title: wxOptions.title, // 分享标题
                        desc: wxOptions.desc, // 分享描述
                        link: wxOptions.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: IP + "/assets/icon/jingku_logo.png", // 分享图标
                        success: function () {
                           // 用户确认分享后执行的回调函数
                           that.native.showToast('分享成功');
                        },
                        cancel: function () {
                           // 用户取消分享后执行的回调函数
                           that.native.showToast('取消分享');
                        }
                     });
                     wx&&wx.onMenuShareWeibo({
                        title: wxOptions.title, // 分享标题
                        desc: wxOptions.desc, // 分享描述
                        link: wxOptions.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: IP + "/assets/icon/jingku_logo.png", // 分享图标
                        success: function () {
                           // 用户确认分享后执行的回调函数
                           that.native.showToast('分享成功');
                        },
                        cancel: function () {
                           // 用户取消分享后执行的回调函数
                           that.native.showToast('取消分享');
                        }
                     });
                     // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                  });
                  wx&&wx.error(function (res) {
                     reject(res)
                     // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                  });
               }
            })
         }, 1000);
      })
   }
}
