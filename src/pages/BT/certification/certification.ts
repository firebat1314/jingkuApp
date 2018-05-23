import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../providers/http-service';
import { deepCopy } from 'ionic-angular/util/util';

/**
 * Generated class for the CertificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'BT/CertificationPage',
  name: 'BTCertificationPage'
})
@Component({
  selector: 'page-certification',
  templateUrl: 'certification.html',
})
export class CertificationPage {

  params: any = {
    code_sn: null,
    cards_name: null,
    cards_phone: null,
    user_phone: null,
    bank_cards: null,
    str_verify: null,
    phone_code: null
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpServ: HttpService,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CertificationPage');
  }
  ngOnInit() {
    this.httpServ.getByName('BT').then(res => {
      if (res && 'bindCard' in res) this.params = res.bindCard;
    })
  }
  next() {
    this.httpServ.Shd_bindCard(this.params).then(res => {
      if (res.status == 1) {
        this.navCtrl.push('BTCertification1Page', { bank_cards: this.params.bank_cards }).then(res => {
          let params = deepCopy(this.params);
          this.httpServ.getByName('BT').then(res => {
            this.httpServ.setByName('BT', Object.assign(res || {}, {
              bindCard: Object.assign(params, {
                str_verify: null,
                phone_code: null
              })
            }));
          })
        });
      }
    })
  }
}
