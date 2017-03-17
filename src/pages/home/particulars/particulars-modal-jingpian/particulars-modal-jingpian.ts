import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the ParticularsModalJingpian page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-particulars-modal-jingpian',
  templateUrl: 'particulars-modal-jingpian.html'
})
export class ParticularsModalJingpianPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl:ViewController
  
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticularsModalJingpianPage');
  }
  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }
}
