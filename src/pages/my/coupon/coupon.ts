import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import Swiper from 'swiper';

/*
  Generated class for the Coupon page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
   selector: 'page-coupon',
   templateUrl: 'coupon.html'
})
export class CouponPage {
   data: any;
   couponSelect = 1;//'' or over_time or use
   showmark: boolean;
   navSwiper: any;
   pageSwiper: any;
   activeIndex: any;
   category: any = [
      {
         cat_name: '全部',
         cat_id: 0
      }, {
         cat_name: '商品券',
         cat_id: 1
      }, {
         cat_name: '店铺券',
         cat_id: 2
      }, {
         cat_name: '全平台券',
         cat_id: 3
      }, {
         cat_name: '运费券',
         cat_id: 4
      }
   ];
   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public el: ElementRef,
      public httpService: HttpService
   ) {
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad CouponPage');
   }
   ngOnInit() {
      this.segmentChange()
   }
   ngAfterViewInit() {

      setTimeout(() => {
         (function (that) {
            //暂时设计每个slide大小需要一致
            let tSpeed = 300 //切换速度300ms
            let borderbar;//可滑动底边dom
            let navSum = 0;//最后一个slide的位置
            let navWidth = 0;//Nav的总宽度
            let topBar; //页头
            let clientWidth = 0; //Nav的可视宽度
            let startPosition;

            let nav = that.el.nativeElement.querySelector('#nav');
            let page = that.el.nativeElement.querySelector('#page');
            that.navSwiper = new Swiper(nav, {
               slidesPerView: 'auto',
               freeMode: true,
               on: {
                  init: function () {
                     let navSlideWidth = this.slides.eq(this.activeIndex).css('width');
                     borderbar = this.$el.find('.bar');
                     borderbar.css('width', navSlideWidth);
                     this.slides.eq(0).find('span').css('color', 'rgb(14, 110, 184)');
                     borderbar.transition(tSpeed);
                     navSum = this.slides[this.slides.length - 1].offsetLeft; //最后一个slide的位置
                     clientWidth = parseInt(this.$wrapperEl.css('width')); //Nav的可视宽度
                     topBar = this.$el.parents('body').find('#top'); //页头

                     for (let i = 0; i < this.slides.length; i++) {
                        navWidth += parseInt(this.slides.eq(i).css('width'));
                     }
                  }
               },
            });

            that.pageSwiper = new Swiper(page, {
               watchSlidesProgress: true,
               spaceBetween : 10,
               on: {
                  slideChange: function () {
                     that.activeIndex = this.activeIndex;
                     that.couponSelect = that.category[this.activeIndex].cat_id;
                     if (!that.category[this.activeIndex].mylist) {
                        that.httpService.getUserBonus({
                           bonus_type: that.couponSelect,
                           page: 1
                        }, { showLoading: false }).then((res) => {
                           if (res.status == 1) {
                              that.category[this.activeIndex].mylist = res;
                           }
                        })
                     }
                  },
                  touchMove: function () {
                     // let progress = this.progress;
                     // let activeNavWidth = that.navSwiper.slides.eq(this.activeIndex).css('width');
                     // borderbar.css('width', activeNavWidth);
                     // borderbar.transition(0);
                     // borderbar.transform('translateX(' + navSum * progress + 'px)');
                     //蓝色14,110,184 灰色51,51,51
                     for (let i = 0; i < this.slides.length; i++) {
                        let slideProgress = this.slides[i].progress;
                        if (Math.abs(slideProgress) < 1) {
                           let r = Math.floor((14 - 51) * (1 - Math.pow(Math.abs(slideProgress), 2)) + 51);
                           let g = Math.floor((110 - 51) * (1 - Math.pow(Math.abs(slideProgress), 2)) + 51);
                           let b = Math.floor((184 - 51) * (1 - Math.pow(Math.abs(slideProgress), 2)) + 51);
                           that.navSwiper.slides.eq(i).find('span').css('color', 'rgba(' + r + ',' + g + ',' + b + ',1)');
                        }
                     }
                  },
                  transitionStart: function () {
                     let activeIndex = this.activeIndex;
                     let activeSlidePosition = that.navSwiper.slides[activeIndex].offsetLeft;
                     let activeNavWidth = that.navSwiper.slides.eq(activeIndex).css('width')
                     //释放时导航粉色条移动过渡
                     borderbar.css('width', activeNavWidth);
                     borderbar.transition(tSpeed)
                     borderbar.transform('translateX(' + activeSlidePosition + 'px)')
                     //释放时文字变色过渡
                     that.navSwiper.slides.eq(activeIndex).find('span').transition(tSpeed)
                     that.navSwiper.slides.eq(activeIndex).find('span').css('color', 'rgba(14, 110, 184,1)')
                     if (activeIndex > 0) {
                        that.navSwiper.slides.eq(activeIndex - 1).find('span').transition(tSpeed)
                        that.navSwiper.slides.eq(activeIndex - 1).find('span').css('color', 'rgba(51,51,51,1)')
                     }
                     if (activeIndex < this.slides.length) {
                        that.navSwiper.slides.eq(activeIndex + 1).find('span').transition(tSpeed)
                        that.navSwiper.slides.eq(activeIndex + 1).find('span').css('color', 'rgba(51,51,51,1)')
                     }
                     //导航居中
                     let navActiveSlideLeft = that.navSwiper.slides[activeIndex].offsetLeft //activeSlide距左边的距离

                     that.navSwiper.setTransition(tSpeed)

                     if (navActiveSlideLeft < (clientWidth - parseInt(activeNavWidth)) / 2) {
                        that.navSwiper.setTranslate(0)
                     } else if (navActiveSlideLeft > navWidth - (parseInt(activeNavWidth) + clientWidth) / 2) {
                        that.navSwiper.setTranslate(clientWidth - navWidth)
                     } else {
                        that.navSwiper.setTranslate((clientWidth - parseInt(activeNavWidth)) / 2 - navActiveSlideLeft)
                     }
                  },
               }
            });

            /* that.navSwiper.$el.on('touchstart', function (e) {
               e.preventDefault() //去掉按压阴影
            }) */
            that.navSwiper.on('tap', function (e) {
               let clickIndex = this.clickedIndex
               let clickSlide = this.slides.eq(clickIndex)
               if (this.clickedIndex !== undefined) {
                  that.pageSwiper.slideTo(clickIndex, 0);
                  this.slides.find('span').css('color', 'rgba(51,51,51,1)');
                  clickSlide.find('span').css('color', 'rgba(14, 110, 184,1)');
               }
            })
         })(this)
      }, 300);

   }
   ionViewWillLeave() {
      this.showmark = false;
   }
   slideTo(index) {
      this.pageSwiper.slideTo(index);
   }
   getPrivilege(type_id) {
      this.navCtrl.push('BrandListPage', {
         keyword: '',
         type_id: type_id
      })
   }
   segmentChange() {
      return this.httpService.getUserBonus({ bonus_type: 0 }).then((res) => {
         if (res.status == 1) {
            this.data = res;
            this.category[0].mylist = res;
         }
      })
   }
   /*下拉刷新*/
   doRefresh(refresher) {
      this.segmentChange().then(() => {
         setTimeout(() => {
            refresher.complete();
         }, 500);
      })
   }
}
