import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrmPage');
  }

  ngAfterViewInit(){
    // var wow = new WOW({
    //   boxClass: 'wow',
    //   animateClass: 'animated',
    //   offset: 0,
    //   mobile: true,
    //   live: true
    // });
    // wow.init();

  }
}
