import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../providers/http-service';
import { MineProvider } from '../../../providers/mine/mine';

declare var Swiper;
/**
 * Generated class for the JingkuFinancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
   selector: 'page-jingku-finance',
   templateUrl: 'jingku-finance.html',
})
export class JingkuFinancePage {
   activeIndex: any = 0;
   swiper: any;
   data: any;
   FmCreditindex: any;

   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private httpServ: HttpService,
      private mine: MineProvider,
   ) {
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad JingkuFinancePage');
   }
   ngOnInit() {
      this.httpServ.jingku_finance().then(res => {
         this.data = res;
      })
      this.httpServ.FmCreditindex().then(res => {
         if (res.status == 1) {
            this.FmCreditindex = res;
         }
      })
   }
   ngAfterViewInit() {
      this.swiper = new Swiper(".jingku-finance-container", {
         // loop: true,
         slidesPerView: "auto",
         centeredSlides: true,
         watchSlidesProgress: true,
         onProgress: (swiper, progress) => {
            var b, c, d, scale, es, nub;
            for (b = 0; b < swiper.slides.length; b++) {
               c = swiper.slides[b];
               d = c.progress;
               scale = 1 - Math.min(Math.abs(.2 * d), 1);
               es = c.style;
               // this.element.nativeElement.style.height = c.offsetHeight+'px';
               es.opacity = 1 - Math.min(Math.abs(d / 2), 1);
               es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = "translate3d(0px,0," + -Math.abs(150 * d) + "px)";
               // nub = this.element.nativeElement.querySelector('.page-nub').style;
               // console.log(c.progress,es.opacity)
               // nub.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = nub.transform = 'scaleX(' + es.opacity + ')';
               this.activeIndex = swiper.activeIndex; 
            }
         },
         onSetTransition: function (a, b) {
            for (var c = 0; c < a.slides.length; c++) {
               let es = a.slides[c].style;
               es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = b + "ms"
            }
         },
         onSlideChangeEnd: (swiper) => {
            this.activeIndex = swiper.activeIndex; //切换结束时，告诉我现在是第几个slide
         }
      })
   }
   checkTab(index) {
      this.swiper.slideTo(index, 1000, true);//切换到第一个slide，速度为1秒
   }
   openFmCredit() {
      this.httpServ.FmCreditGate().then(res => {
         if (res.status == 1) {
            this.navCtrl.push('IframeBrowserPage', {
               browser: {
                  title: '镜库金融',
                  url: 'https://www.jingku.cn/openFmCredit.html?data=' + encodeURIComponent(res.data) + '&url=' + encodeURIComponent(res.api_url),
               }
            })
         }
         // this.navCtrl.push('ViewerContractPage',{url:'http://newpc.jingkoo.net/openFmCredit.html?data=' + encodeURIComponent(res.data) + '&url=' + encodeURIComponent(res.api_url)});
         // if (this.native.isMobile()) {
         // this.iab.create('http://newpc.jingkoo.net/openFmCredit.html?data=' + encodeURIComponent(res.data) + '&url=' + encodeURIComponent(res.api_url), this.native.isMobile() ? '_system' : '_self');
      })
   }
   openSHD() {
      this.httpServ.Shd_add_user().then(res => {
         if (res.status == 1) {
            this.navCtrl.push('BTIndexPage');
         }
      })
   }
}
