import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ViewController } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";

/*
  Generated class for the AccountWithdraw page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-account-withdraw',
  templateUrl: 'account-withdraw.html'
})
export class AccountWithdrawPage {

  brankList: any;
  open_bank: any = {
    name: '',
    code: ''
  };
  formData = {
    pay: 'allinpay',
    brank_code: '',
    open_bank: '',
    name: '',
    amount: '',
    desc: '',
    password:''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpService,
    private native: Native,
    private viewCtrl: ViewController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountWithdrawPage');
  }
  ngOnInit() {
    this.httpService.brank_number().then(res => {
      if (res.status) {
        this.brankList = res.recharge_list;
      }
    })
  }
  submit() {
    this.httpService.withdrawals(this.formData).then((res) => {
      this.native.showToast(res.data);
      if (res.status == 1) {
        var view = this.viewCtrl;
        this.navCtrl.push('AccountWithdrawSucceedPage').then(() => {
          this.navCtrl.removeView(view);
        });;
      }
    })
  }
}
