import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";

/*
  Generated class for the AccountHelper page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account-helper',
  templateUrl: 'account-helper.html'
})
export class AccountHelperPage {
  data: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpService
  ) {
    this.httpService.help().then((res) => {
      console.log(res)
      if (res.status == 1) {
        this.data = res;
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountHelperPage');
  }

}
