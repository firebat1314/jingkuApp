import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MessageDetailsPage } from "./message-details/message-details";

/*
  Generated class for the Message page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }
  goMessageDetailsPage(){
    this.navCtrl.push(MessageDetailsPage)
  }
}
