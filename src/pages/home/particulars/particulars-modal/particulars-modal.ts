import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events, IonicPage, ModalController } from 'ionic-angular';

// import { CityPage } from "../../city/city"
import { HttpService } from "../../../../providers/http-service";
import { Native } from "../../../../providers/native";
import { GalleryModal } from 'ionic-gallery-modal';
/*
  Generated class for the ParticularsModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-particulars-modal',
  templateUrl: 'particulars-modal.html'
})
export class ParticularsModalPage {
  goodsId = this.navParams.get('goodsId');
  title = this.navParams.get('name');
  getBonus = this.navParams.get('getBonus');
  sendto = this.navParams.get('sendto');;
  GoodsInfo = this.navParams.get('GoodsInfo');
  distributionInfo = this.navParams.get('distributionInfo');
  promotion = this.navParams.get('promotion');
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public httpService: HttpService,
    public events: Events,
    public modalCtrl: ModalController,
    public native: Native
  ) {
    this.events.subscribe('particulars:update', () => {
      this.getAreaData();
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticularsModalPage');
  }
  ngAfterViewInit() {
  }
  dredgeMoreCity() {
    this.dismiss('goDredgeMoreCityPage');
  }
  getPrivilege(item, event) {
    if (item.is_get == 1) {
      this.native.showToast('已经领取过了哦');
    } else if (item.is_get == 0) {
      this.httpService.sendByUser({ type_id: item.type_id }).then((res) => {
        if (res.status) {
          this.native.showToast('领取成功');
          this.getBonus[event].is_get = 1;
        }
      });
    }
  }
  getAreaData() {
    return this.httpService.goodsInfos({ goods_id: this.goodsId }).then((res) => {
      // console.log(111)
      if (res.status) {
        this.sendto = res.sale_city;
      }
    })
  }
  setArea(item) {
    // console.log(item)
    if (item.is_goods_city == 0) {
      this.native.openAlertBox('不在可配送城市,是否切换城市？', () => {
        this.navCtrl.push('CityPage');
      }, () => {
        this.getAreaData();
      })
      return;
    }
    this.httpService.editArea({ id: item.province }).then((res) => {
      if (res.status == 1) {
        this.events.publish('home:update');
        this.events.publish('car:update');
        this.httpService.changeConsignee({ address_id: item.address_id }).then((res) => {
          // console.log(res);
          if (res.status == 1) {
            this.native.showToast('地址已切换')
            this.viewCtrl.dismiss(item);
          } else {
            this.getAreaData();
          }
        })
      }
    })

    /* this.httpService.setArea({
      goods_id: this.GoodsInfo.goods_id,
      gaid: item.gaid ? item.gaid : '',
      region_id: item.region_id
    }).then((res) => {
      if (res.status == 1) {
        this.viewCtrl.dismiss({ region_name: item.region_name });
        this.native.showToast('切换成功');
      }
    }) */
  }
  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }

  zzImgDownload(imgs){
    var arr = new Array();
      if (imgs.length) {
         imgs.forEach(element => {
            arr.push({ url: element });
         });
      }
    this.modalCtrl.create(GalleryModal, {
      photos: arr,
      initialSlide: 0,
   }).present();
  }
}
