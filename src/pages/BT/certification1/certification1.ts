import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../providers/http-service';
import { Native } from '../../../providers/native';

/**
 * Generated class for the Certification1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'BT/Certification1Page/:bank_cards',
  name: 'BTCertification1Page'
})
@Component({
  selector: 'page-certification1',
  templateUrl: 'certification1.html',
})
export class Certification1Page {

  params: any = {
    bank_cards: this.navParams.get('bank_cards'),
    bank_verify: null
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpServ: HttpService,
    private native: Native,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Certification1Page');
  }
  submit() {
    this.httpServ.Shd_bankConfirm(this.params).then(res => {
      if (res.status == 1) {
        this.native.showToast(res.info);
        this.navCtrl.setPages([{ page: 'NewMyPage' }, { page: 'BTIndexPage' }, { page: 'BTRepaymentInfoPage' }], { direction: "forward", animate: true })
      }
    })
  }
}
