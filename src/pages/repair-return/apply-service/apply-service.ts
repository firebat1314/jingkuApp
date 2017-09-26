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
  segment: 'apply-service/:order_id/:rec_ids'
})
@Component({
  selector: 'page-apply-service',
  templateUrl: 'apply-service.html',
})
export class ApplyServicePage {

  order_id: any = this.navParams.get("order_id");
  rec_id: any = this.navParams.get("rec_ids");
  data;
  params = {
    rec_ids: {},
    order_id: this.order_id,
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
    this.getData()
  }
  getData() {
    this.httpService.repairApply({
      order_id: this.order_id,
      rec_ids: this.rec_id
    }).then((res) => {
      if (res.status == 1) {
        this.data = res
      }
    })
  }
  openCamra(event) {
    if (this.params.return_img.length >= 5) {
      this.native.showToast('最多选择5张照片');
      return;
    }
    this.params.return_img.push(event);
    /* if (this.params.return_img.length >= 5) {
      this.native.showToast('最多选择5张照片', null, false);
      return;
    }
    this.native.getMultiplePicture({
      outputType: 1,
      maximumImagesCount: 5 - this.params.return_img.length
    }).then((res) => {
      if (res instanceof Array) {
        if (this.params.return_img.concat(res).length > 5) {
          this.native.showToast('最多选择5张照片');
          this.params.return_img = this.params.return_img.concat(res).slice(0, 5);
        } else {
          this.params.return_img.concat(res);
        }
      }
    }, (err) => {
      console.log(err)
    }) */
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
        this.params.rec_ids[this.rec_id] = item.goods_number;
      }
    })
    // this.native.showToast('提交成功',800,false)
    this.httpService.submitRepair(this.params).then((res) => {
      if (res.status == 1) {
        this.navCtrl.push('ApplyService2Page', { data: res });
      }
    })
  }
}
