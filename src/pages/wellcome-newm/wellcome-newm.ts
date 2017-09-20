import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

/**
 * Generated class for the WellcomeNewmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var Swiper: any;
declare var WOW: any;
declare var TouchSlide: any;

@IonicPage()
@Component({
  selector: 'page-wellcome-newm',
  templateUrl: 'wellcome-newm.html',
})
export class WellcomeNewmPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ele: ElementRef,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WellcomeNewmPage');
  }
  ngAfterViewInit() {
    // setTimeout(function () {
    // var wow = new WOW({
    //     boxClass: 'wow',
    //     animateClass: 'animated',
    //     offset: 0,
    //     mobile: true,
    //     live: true
    //   });
    //   wow.init();
    // }, 2000);
    // TouchSlide({
      // slideCell: "#hez-cont",
    //   endFun: (i) => { //高度自适应
    //     console.log(this.ele.nativeElement.querySelector("#tabBox1-bd"))
    //     var bd = this.ele.nativeElement.querySelector("#tabBox1-bd");
    //     bd.parentNode.style.height = bd.children[i].children[0].offsetHeight + "px";
    //     if (i > 0) bd.parentNode.style.transition = "200ms";//添加动画效果
    //   }
    // });
  }
}
