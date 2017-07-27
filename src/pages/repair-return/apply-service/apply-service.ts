import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";

/**
 * Generated class for the ApplyServicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  defaultHistory: ['RepairReturnPage'],
  segment: 'repair-return'
})
@Component({
  selector: 'page-apply-service',
  templateUrl: 'apply-service.html',
})
export class ApplyServicePage {

  data: any = this.navParams.get("data");
  params = {
    rec_ids: {},
    order_id: this.data.order_info ? this.data.order_info.order_id : null,
    return_type: null,
    type_note: null,
    str_desc: null,
    return_img: [],
    return_way: null,
  }
  type_note_txt: string = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native,
    public modalCtrl: ModalController,
  ) { }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyServicePage');
  }
  openCamra() {
    console.log(this.params.return_img.length)
    this.native.getMultiplePicture({
      outputType: 1,
      maximumImagesCount: 5 - this.params.return_img.length
    }).then((data) => {
      console.log(data)
      if (data instanceof Array) {
        if (this.params.return_img.concat(data).length > 5) {
          this.native.showToast('最多选择5张');
          this.params.return_img = this.params.return_img.concat(data).slice(0, 5);
        } else {
          this.params.return_img.concat(data);
        }
      }
    }, (err) => {
      console.log(err)
    })
  }
  deletePic(i) {
    this.params.return_img.splice(i, 1);
  }
  openReasonModal() {
    var modal = this.modalCtrl.create('ReasonModalPage');
    modal.onDidDismiss((data) => {
      if (data) {
        this.params.type_note = data.type_note;
        this.type_note_txt = data.text;
      }
    })
    modal.present();
  }
  goServiceOrderDetailsPage() {
    this.data.goodslist.forEach(item => {
      if (item.goods_number) {
        this.params.rec_ids[item.rec_id] = item.goods_number;
      }
    })
    // this.native.showToast('提交成功',800,false)
    this.navCtrl.push('ApplyService2Page');
    this.httpService.submitRepair(this.params).then((res) => {
      if (res.status == 1) {
        this.navCtrl.push('ApplyService2Page', { data: res });
      }
    })
  }
}
