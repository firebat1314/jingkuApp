import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Events, Content, IonicPage, FabButton, ScrollEvent } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";
import Swiper from 'swiper';

/*
  Generated class for the DiscountCoupon page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
   selector: 'page-discount-coupon',
   templateUrl: 'discount-coupon.html'
})
export class DiscountCouponPage {
   data: any;
   @ViewChild(Content) content: Content;
   @ViewChild(FabButton) fabButton: FabButton;
   couponSelect: number = 0;
   category: any;
   showmark: boolean;
   navSwiper: any;
   activeIndex: number;
   pageSwiper: any;
   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public native: Native,
      public events: Events,
      public httpService: HttpService,
      public el: ElementRef,
   ) { }

   ionViewDidLoad() {
      console.log('ionViewDidLoad DiscountCouponPage');
   }
   ngOnInit() {
      this.getCategory();
   }

   ionViewWillLeave() {
      this.showmark = false;
   }
   ngAfterViewInit() {
      this.content.ionScroll.subscribe((d:ScrollEvent)=>{
         let top = this.el.nativeElement.querySelector('.mytoolbar');
         let slide = this.el.nativeElement.querySelector('#page .swiper-slide');
         if(d.scrollTop>top.offsetTop){
         }else{
         }
      })

   }
   getCategory() {
      this.httpService.CatCoupon().then(res => {
         if (res.status == 1) {
            this.category = res;
            this.getCouponData();

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
                     on: {
                        init: function () {
                           let infiniteScroll = true;
                           this.slides.eq(0).on('scroll', function (d) {
                              if (infiniteScroll) {
                                 if (d.target.scrollHeight - d.target.scrollTop < d.target.offsetHeight + 200) {
                                    infiniteScroll = false;
                                    if (that.data.page < that.data.pages) {
                                       that.httpService.coupon({
                                          cat: 0,
                                          page: ++that.data.page
                                       }).then((res) => {
                                          infiniteScroll = true;
                                          if (res.status == 1) {
                                             that.data.list = [...that.data.list, ...res.list];
                                          }
                                       })
                                    }
                                 }
                              }
                           })
                        },
                        slideChange: function () {
                           that.activeIndex = this.activeIndex;

                           if (this.activeIndex == 0) {
                              that.couponSelect = 0;
                              if (this.data) {
                                 that.getCouponData();
                              }
                           } else {
                              that.couponSelect = that.category.list[this.activeIndex - 1].cat_id;
                              if (!that.category.list[this.activeIndex - 1].mylist) {
                                 that.httpService.coupon({
                                    cat: that.category.list[this.activeIndex - 1].cat_id,
                                    page: 1
                                 }).then((res) => {
                                    if (res.status == 1) {
                                       that.category.list[this.activeIndex - 1].mylist = res;
                                    }
                                 })
                              }
                           }

                           let infiniteScroll = true;
                           this.slides.eq(this.activeIndex).on('scroll', function (d) {
                              if (infiniteScroll) {
                                 if (d.target.scrollHeight - d.target.scrollTop < d.target.offsetHeight + 200) {
                                    infiniteScroll = false;
                                    if (that.activeIndex == 0) {
                                       infiniteScroll = false;
                                       if (that.data.page < that.data.pages) {
                                          that.httpService.coupon({
                                             cat: 0,
                                             page: ++that.data.page
                                          }).then((res) => {
                                             infiniteScroll = true;
                                             if (res.status == 1) {
                                                that.data.list = [...that.data.list, ...res.list];
                                             }
                                          })
                                       }
                                    } else {
                                       if (that.category.list[that.activeIndex - 1].mylist.page < that.category.list[that.activeIndex - 1].mylist.pages) {
                                          that.httpService.coupon({
                                             cat: that.category.list[that.activeIndex - 1].cat_id,
                                             page: ++that.category.list[that.activeIndex - 1].mylist.page
                                          }).then((res) => {
                                             infiniteScroll = true;
                                             if (res.status == 1) {
                                                that.category.list[that.activeIndex - 1].mylist.list = [...that.category.list[that.activeIndex - 1].mylist.list, ...res.list];
                                             }
                                          })
                                       }
                                    }
                                 }
                              }
                           })
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
      });
   }
   getCouponData(id = 0) {
      this.httpService.coupon({
         cat: 0,
         page: 1
      }).then((res) => {
         if (res.status == 1) {
            this.data = res;
         }
      })
   }
   slideTo(index) {
      this.pageSwiper.slideTo(index);
   }
   getPrivilege(item) {
      if (item.is_get == 1 || item.is_get == 2) {
         this.toUse(item.suppliers_id);
      } else if (item.is_get == 0) {
         this.native.openAlertBox('确认领取优惠券', () => {
            this.httpService.sendByUser({ type_id: item.type_id }).then((res) => {
               if (res.status == 1) {
                  this.native.showToast('领取优惠券成功');
                  item.is_get = 1
               }
            })
         })
      }
   }
   toUse(suppliers_id) {
      if (suppliers_id == 0) {
         this.navCtrl.push('BrandListPage', { keyword: '镜库' })
      } else if (suppliers_id < 0) {
         this.navCtrl.push('BrandListPage', { keyword: '' })
      } else {
         this.navCtrl.push('ParticularsHomePage', { suppliersId: suppliers_id })
      }
   }

}