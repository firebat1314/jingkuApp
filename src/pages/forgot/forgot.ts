import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { HttpService } from "../../providers/http-service";


/*
  Generated class for the Forgot page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html'
})
export class ForgotPage {
  username: any;
  public secondPage;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpService
  ) {
    this.secondPage = 'ForgotTwoPage';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPage');
  }
  onSubmit() {
    this.httpService.forgotPwd({
      username: this.username,
      step: 'one'
    }).then((res) => {
      if (res.status == 1) {
        this.navCtrl.push('ForgotTwoPage', { phoneNumber: res.phoneNumber });
      }
    })
  }
}
