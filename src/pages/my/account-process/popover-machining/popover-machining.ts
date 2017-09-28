import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverMachiningPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover-machining',
  templateUrl: 'popover-machining.html',
})
export class PopoverMachiningPage {

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public viewCtrl: ViewController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverMachiningPage');
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }

}
