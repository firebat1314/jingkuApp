import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

/**
 * Generated class for the BusinessmenNotePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  segment:'businessmen-note'
})
@Component({
  selector: 'page-businessmen-note',
  templateUrl: 'businessmen-note.html',
})
export class BusinessmenNotePage {
  callback: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    /* this.callback = this.navParams.get('callback')
    console.log(this.callback)
    this.callback('sss').then((res)=>{
      console.log(res)
    }) */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessmenNotePage');
  }

}
