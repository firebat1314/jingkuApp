import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../providers/http-service';

/**
 * Generated class for the OpenSealPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'BT/OpenSealPage',
  name: 'BTOpenSealPage'
})
@Component({
  selector: 'page-open-seal',
  templateUrl: 'open-seal.html',
})
export class OpenSealPage {
  timer: number;
  downtime: number;
  code: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpServ: HttpService,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpenSealPage');
  }
  getMobileCode() {
    this.httpServ.Shd_sendSignCheckCode({
      borrow_no: '123',
      ident_no: '123',
      person_name: '123',
      mobile_phone: '123'
    }).then(res => {
      if (res.status == 1) {
        this.downtime = 60;
        this.timer = setInterval(() => {
          if (this.downtime == 1) {
            this.downtime = null;
            clearInterval(this.timer);
          } else {
            --this.downtime;
          }
        }, 1000)
      }
    })
  }
  ngOnDestroy() {
    clearInterval(this.timer)
  }
  openSeal() {
    // this.httpServ.Shd_loanSetup({sms_check_code:this.code}).then(res => {

    // })
    this.navCtrl.push('BTWithdrawPage', { sms_check_code: this.code });
  }
}
