import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { HttpService } from '../../../providers/http-service';
import { MineProvider } from '../../../providers/mine/mine';
import { Native } from '../../../providers/native';

/**
 * Generated class for the WithdrawPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'BT/WithdrawPage/:sms_check_code',
  name: 'BTWithdrawPage'
})
@Component({
  selector: 'page-withdraw',
  templateUrl: 'withdraw.html',
})
export class WithdrawPage {
  data: any;
  sms_check_code = this.navParams.get('sms_check_code');
  params: any = {
    loan_amt: null,
    loan_term: null,
    bank_code: null,
    sms_check_code: this.sms_check_code,
    app_term: null,
    bank_card_no: null
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private httpServ: HttpService,
    private native: Native,
    private modalCtrl: ModalController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdrawPage');
  }
  ngOnInit() {
    this.httpServ.getByName('userInfo').then((userInfo) => {
      if (userInfo) {
        this.httpServ.Shd_get_shd_info({ user_id: userInfo.data.user_info.user_id }).then(res => {
          if (res.status) {
            this.data = res;
          }
        })
      }
    });
  }
  goHelperDetailsPage(article) {
    this.modalCtrl.create('AgreementPage',{article:article}).present();
  }
  submit() {
    let confirm = this.alertCtrl.create({
      cssClass: 'alert-style',
      title: '确认签约',
      message: '确认签约后，不可撤销。我们将在您确认后安排资金，实际到账后开始计息。',
      enableBackdropDismiss: true,
      buttons: [
        {
          text: '取消',
        }, {
          text: '确认',
          handler: () => {
            this.httpServ.Shd_loanSetup(this.params).then(res => {
              if (res.status == 1) {
                this.native.showToast(res.info);
                this.navCtrl.setPages([{ page: 'NewMyPage' }, { page: 'BTIndexPage' }], { direction: "forward", animate: true })
              }
            })
          }
        }
      ],
    });
    confirm.present();
  }
}
