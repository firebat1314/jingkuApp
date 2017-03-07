import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the ParticularsModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-particulars-modal',
  templateUrl: 'particulars-modal.html'
})
export class ParticularsModalPage {
  title:String;
  value:number;
  getBonus;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) { 
    this.title = this.navParams.get('name');
    this.getBonus = this.navParams.get('getBonus')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticularsModalPage');
  }
  numberIChange(value:number){
    this.value = value;
  }
  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }
}
