import { Component } from '@angular/core';
import { NavController, NavParams, Events, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AccountSecurity page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-account-security',
  templateUrl: 'account-security.html'
})
export class AccountSecurityPage {
  ChangePhoneNumberPage: any = 'ChangePhoneNumberPage';
  ChangePasswordPage: any = 'ChangePasswordPage'

  phonenumber: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage, public events: Events
  ) { }
  ngOnDestroy() {
    this.events.unsubscribe('phonenumber:updata');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountSecurityPage');
    this.storage.get('phonenumber').then((res) => {
      this.phonenumber = res;
    });
    this.events.subscribe('phonenumber:updata', (res) => {
      this.phonenumber = res;
    });
  }

}
