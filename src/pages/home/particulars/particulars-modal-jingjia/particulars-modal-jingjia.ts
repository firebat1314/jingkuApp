import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the ParticularsModalJingjia page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-particulars-modal-jingjia',
  templateUrl: 'particulars-modal-jingjia.html'
})
export class ParticularsModalJingjiaPage {
  headData: any;
  type: any;
  data: any;
  constructor(
    public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController
  ) {
    this.data = this.navParams.get('data');
    this.type = this.navParams.get('type');
    this.headData = this.navParams.get('headData');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticularsModalJingjiaPage');
  }
  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }
  numberIChange($event){
    console.log($event)
  }
}
