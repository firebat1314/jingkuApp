import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

/**
 * Generated class for the WellcomeNewmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var WOW: any;
declare var TouchSlide: any;

@IonicPage()
@Component({
  selector: 'page-wellcome-newm',
  templateUrl: 'wellcome-newm.html',
})
export class WellcomeNewmPage {
  wow: any;

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
    this.wow = new WOW({
      element:this.ele.nativeElement.querySelector('.content'),
      scrollElement: this.ele.nativeElement.querySelector('.scroll-content')
    })
    this.wow.init();
    setTimeout(function() {
      TouchSlide({
        slideCell: "#hez-cont",
        autoPlay:true,
        titCell:".hd li"
      });
    }, 1000);
  }

}
