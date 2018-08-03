import { Component } from '@angular/core';
import { ViewController, NavParams, NavController, IonicPage } from 'ionic-angular';
import { Native } from "../../../providers/native";

/**
 * Generated class for the PopoverHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
   selector: 'page-popover-home',
   templateUrl: 'popover-home.html',
})
export class PopoverHomePage {

   constructor(
      public viewCtrl: ViewController,
      public navCtrl: NavController,
      public navParams: NavParams,
      public native: Native
   ) { }
   ionViewDidLoad() {
      console.log('ionViewDidLoad PopoverHomePage');
   }
   goMessagePage() {
      this.viewCtrl.dismiss('MessagePage');
   }
   openScanner() {
      this.native.openBarcodeScanner().then((result) => {
         console.log(result)
         this.viewCtrl.dismiss();
         
      }).catch(() => {
         console.log('openBarcodeScanner error')
      })
      return false;
   }
}
