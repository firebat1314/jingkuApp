import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

declare var WOW: any;
/**
 * Generated class for the CrmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crm',
  templateUrl: 'crm.html',
})
export class CrmPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public ele: ElementRef,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrmPage');
  }

  ngAfterViewInit() {
    var wow = new WOW({
      element:this.ele.nativeElement.querySelector('.content'),
      scrollElement: this.ele.nativeElement.querySelector('.scroll-content')
    }).init();
  }
}
