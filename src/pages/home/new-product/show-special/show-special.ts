import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../../providers/http-service';

/**
 * Generated class for the ShowSpecialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-special',
  templateUrl: 'show-special.html',
})
export class ShowSpecialPage {
  data: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpServ: HttpService,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowSpecialPage');
  }

  ngOnInit() {
    this.httpServ.showSpecial().then(res => {
      this.data = res;
    })
  }
}
