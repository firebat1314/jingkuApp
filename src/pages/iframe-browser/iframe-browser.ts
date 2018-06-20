import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
// import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the IframeBrowserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
   segment: 'iframe-browser/:browser'
})
@Component({
   selector: 'page-iframe-browser',
   templateUrl: 'iframe-browser.html',
})
export class IframeBrowserPage {
   browser: any = {
      isLoaded: false, // 网页是否被加载
      proObj: null, // 进度条对象
      progress: 0, // 网页访问的进度条
      secUrl: '', // 安全链接
      title: '加载中…',
      url: '',
      share: null // 是否具有分享功能（传递一个分享对象ShareModel过来）
   };

   shareConfig: any = {
      isShow: false
   }; // 分享控制的配置
   @ViewChild('iframe') myIframe: ElementRef
   listenGlobalFun: Function;

   constructor(
      public navCtrl: NavController,
      private params: NavParams,
      private renderer: Renderer,
   ) {
      this.listenGlobalFun = this.renderer.listen('window', 'message', (res) => {
         console.log(res)
         if (res.data.type == 'function') {
           return eval(res.data.value);
         }
         this.removePage();
      })
   }
   ngOnInit() {
      let browser = this.params.get('browser');
      setTimeout(() => {
         if (browser) {
            this.browser.secUrl = browser.url;
         } else {
            this.browser.secUrl = this.browser.url;
         }
      }, 500);
   }
   ionViewDidLoad() {
      if (!this.browser.proObj) {
         this.browser.proObj = document.getElementById('progress');
      }
      this.onprogress();
   }
   ngOnDestroy() {
      this.listenGlobalFun();
   }
   back() {
      history.back();
   }
   removePage() {
      this.navCtrl.pop({ direction: "forward", animate: false }).then(() => { }).catch(() => {
         this.navCtrl.setPages([{ page: 'NewMyPage' }], { direction: "forward", animate: false, isNavRoot: true });
      })
   }
   // 生成随机数
   private random(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1) + min);
   }

   // 网页访问进度
   private onprogress() {
      // 随机时间
      let timeout = this.random(10, 30);

      let timer = setTimeout(() => {
         if (this.browser.isLoaded) {
            this.browser.proObj.style.width = '100%';
            clearTimeout(timer);
            return;
         }

         // 随机进度
         this.browser.progress += this.random(1, 5);

         // 随机进度不能超过 90%，以免页面还没加载完毕，进度已经 100% 了
         if (this.browser.progress > 90) {
            this.browser.progress = 90;
         }

         this.browser.proObj.style.width = this.browser.progress + '%';
         this.onprogress();
      }, timeout);
   }

   // 如果iframe页面加载成功后
   loaded() {
      setTimeout(() => {
         this.browser.isLoaded = true;
         let browser = this.params.get('browser');
         this.browser.title = browser.title;
         this.browser.url = browser.url;
         if (browser.share) {
            this.browser.share = browser.share;
         }
      }, 800);
   }

   // 显示Popver选项
   presentPopover(myEvent) {
      let cb = {
         refresh: () => {
            this.reload();
         },
         close: () => {
            this.navCtrl.pop();
         },
         share: null
      };

      if (this.browser.share) {
         cb.share = () => {
            this.share();
         }
      }

      /* let popover = this.popoverCtrl.create(BrowserPopoverPage, {
         callback: cb
      });
      popover.present({
         ev: myEvent
      }); */
   }

   // 重新加载页面
   reload() {
      let title = this.browser.title;
      let url = this.browser.secUrl;
      this.browser.title = '加载中…';
      this.browser.secUrl = '';

      setTimeout(() => {
         this.browser.isLoaded = false;
         this.browser.progress = 0;
         if (!this.browser.proObj) {
            this.browser.proObj = document.getElementById('progress');
         }
         this.onprogress();
         this.browser.title = title;
         this.browser.secUrl = url;
      }, 10);
   }

   // 分享页面（作为popover的回调）
   share() {
      this.shareConfig.isShow = true;
      /*if(this.browser.share) {
        SocialSharing.share(this.browser.share.title, this.browser.share.content, '', this.browser.share.url).then(() => {
  
        }, (err) => {
          // Error!
          alert('错误：分享失败！' + err);
        });
      }*/
   }

}
