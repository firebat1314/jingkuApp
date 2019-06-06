import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { MineProvider } from '../../providers/mine/mine';
import { HttpService } from '../../providers/http-service';
import { Native } from '../../providers/native';
import { WxServiceProvider } from '../../providers/wx-service/wx-service';
import { IP } from '../../providers/constants';
import { Clipboard } from '@ionic-native/clipboard';


/**
 * Generated class for the SharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
   segment: 'share'
})
@Component({
   selector: 'page-share',
   templateUrl: 'share.html',
})
export class SharePage {
   data: any;
   showMark: boolean = false;
   shareUrl = 'http://m.jingku.cn/#/nav/n4/signup/' + this.mine.userInfo.data.UserShare;
   href: string;

   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public mine: MineProvider,
      public httpServ: HttpService,
      private wxService: WxServiceProvider,
      private native: Native,
      public actionSheetCtrl: ActionSheetController,
      public clipboard: Clipboard
      
   ) {
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad SharePage');
   }

   ngOnInit() {
      this.href = 'https://m.jingku.cn' + '/#/nav/n4/signup/' + this.mine.userInfo.data.UserShare;
      console.log(this.href)
      this.mine.userInfo && this.httpServ.Share({ signup: this.mine.userInfo.data.UserShare }).then(res => {
         if (res.status == 1) {
            this.data = res;
            /* IP + '/#/nav/n4/signup/' + this.mine.userInfo.data.UserShare */
            /* setTimeout(() => {
               this.wxService.config({
                  title: '我正在使用镜库，推荐给你。' + this.data.type_money + '元代金券一并奉上', // 分享标题
                  desc: '眼镜业B2B专业服务平台', // 分享描述
                  link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
               }).then(res => {
               }).catch(res => {

                  // alert(JSON.stringify(res))
               })
            }, 1000); */
         }
      })
   }

   sharing() {
      this.showMark = true;
     /*  if (this.native.isWeixin()) {
         this.showMark = true;
      } else if (this.native.isMobile()) {
         (<any>window).Wechat.isInstalled((installed) => {
            console.log("Wechat installed: " + (installed ? "Yes" : "No"));
         }, function (reason) {
            console.log("Failed: " + reason);
         });
         let actionSheet = this.actionSheetCtrl.create({
            title: '分享到',
            buttons: [
               {
                  text: '微信好友',
                  handler: () => {
                     (<any>window).Wechat.share({
                        message: {
                           title: "我正在使用镜库，推荐给你。30元代金券一并奉上",
                           description: "眼镜业B2B专业服务平台.",
                           thumb: "https://m.jingku.cn/assets/icon/jingku_logo.png",
                           media: {
                              type: (<any>window).Wechat.Type.WEBPAGE,
                              webpageUrl: this.shareUrl
                           }
                        },
                        scene: (<any>window).Wechat.Scene.SESSION   // share to Timeline
                     }, function () {
                        this.native.showToast("分享成功");
                     }, function (reason) {
                        this.native.showToast("分享失败" + reason);
                     });
                  }
               },
               {
                  text: '朋友圈',
                  handler: () => {

                     (<any>window).Wechat.share({
                        message: {
                           title: "我正在使用镜库，推荐给你。30元代金券一并奉上",
                           description: "眼镜业B2B专业服务平台.",
                           thumb: "https://m.jingku.cn/assets/icon/jingku_logo.png",
                           media: {
                              type: (<any>window).Wechat.Type.WEBPAGE,
                              webpageUrl: this.shareUrl
                           }
                        },
                        scene: (<any>window).Wechat.Scene.TIMELINE   // share to Timeline
                     }, function () {
                        this.native.showToast("分享成功");
                     }, function (reason) {
                        this.native.showToast("分享失败" + reason);
                     });
                  }
               },
               {
                  text: '复制链接',
                  handler: () => {
                     var textArea = document.createElement("textarea");
                     textArea.style.position = 'fixed';
                     textArea.style.top = '0';
                     textArea.style.left = '0';
                     textArea.style.width = '0';
                     textArea.style.height = '0';
                     textArea.style.padding = '0';
                     textArea.style.border = 'none';
                     textArea.style.outline = 'none';
                     textArea.style.boxShadow = 'none';
                     textArea.style.background = 'transparent';
                     textArea.value = 'http://newm.jingkoo.net/#/nav/n4/signup/' + this.mine.userInfo.data.UserShare;
                     document.body.appendChild(textArea);
                     textArea.select();

                     try {
                        var successful = document.execCommand('copy');
                        var msg = successful ? '成功复制到剪贴板' : '该浏览器不支持点击复制到剪贴板';
                        // this.native.showToast(msg);
                     } catch (err) {
                        this.clipboard.copy(this.shareUrl);
                        // this.native.showToast('该浏览器不支持点击复制到剪贴板');
                     }

                     document.body.removeChild(textArea);
                  }
               },
               {
                  text: '取消',
                  role: 'cancel',
                  handler: () => {
                  }
               }
            ]
         });
         actionSheet.present();
      } else {
         this.native.showToast('请在镜库公众号或者app打开')
      } */
   }
}
