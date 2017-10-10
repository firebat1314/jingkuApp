import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { HttpService } from "../../providers/http-service";
import { Native } from '../../providers/native';


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
    private httpService: HttpService,
    private native: Native
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
        if(res.phoneNumber){
          this.navCtrl.push('ForgotTwoPage', { phoneNumber: res.phoneNumber });
        }else{
          this.native.showToast('未绑定电话号码');
        }
      }
    })
  }
}
