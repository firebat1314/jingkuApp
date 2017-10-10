import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
declare var WOW: any;

/**
 * Generated class for the GhsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ghs',
  templateUrl: 'ghs.html',
})
export class GhsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,    public ele: ElementRef,
  ) {
  }
  
  ngAfterViewInit() {
    var wow = new WOW({
      element:this.ele.nativeElement.querySelector('.content'),
      scrollElement: this.ele.nativeElement.querySelector('.scroll-content')
    }).init();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GhsPage');
  }

}
