import { Component } from '@angular/core';
import { NavController, NavParams, Events, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";
import { Native } from "../../../../providers/native";

/*
  Generated class for the InvoiceQualification page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage({
  segment: "invoice-qualification/:ivid"
})
@Component({
  selector: 'page-invoice-qualification',
  templateUrl: 'invoice-qualification.html'
})
export class InvoiceQualificationPage {
  data: any;
  ivid = this.navParams.get('ivid');
  formData = {
    ivid: this.ivid || null,
    type: 1,
    payee: null,
    inv_type: 1,
    company: null,
    sw_sn: null,
    bank_name: null,
    bank_sn: null,
    address: null,
    tel: null,
    yyzz: null,//执照复印件
    taxpayer_num: null
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpService,
    private native: Native,
    private events: Events
  ) {

  }

  ngOnInit() {
    if (this.ivid) {
      this.getFormData();
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoiceQualificationPage');
  }
  getFormData() {
    this.httpService.updateInv({ ivid: this.ivid }).then((res) => {
      if (res.status == 1) {
        this.data = res;
        this.formData.type = res.data.type;
        this.formData.payee = res.data.payee;
        this.formData.inv_type = res.data.inv_type;
        this.formData.company = res.data.company;
        this.formData.sw_sn = res.data.sw_sn;
        this.formData.bank_name = res.data.bank_name;
        this.formData.bank_sn = res.data.bank_sn;
        this.formData.address = res.data.address;
        this.formData.tel = res.data.tel;
        this.formData.taxpayer_num = res.data.taxpayer_num;
      }
    })
  }

  add() {
    if(!this.formData.yyzz && !this.ivid && this.formData.inv_type == 2){
      this.native.showToast('请上传营业执照');
      return false
    }
    if (this.formData.inv_type == 2) {
      this.httpService.updateInvPost(this.formData).then((res) => {
        if (res.status == 1) {
          this.native.showToast(res.info);
          this.navCtrl.pop().catch(res => { history.back() });
          this.events.publish('receipt:update');
        }
      })
    } else {
      this.httpService.updateInvPost({
        ivid: this.ivid || null,
        type: this.formData.type,
        payee: this.formData.payee,
        inv_type: this.formData.inv_type,
      }).then((res) => {
        if (res.status == 1) {
          this.native.showToast(res.info);
          this.navCtrl.pop().catch(res => { history.back() });
          this.events.publish('receipt:update');
        }
      })
    }
  }
}
