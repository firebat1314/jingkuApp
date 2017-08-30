import { Component } from '@angular/core';
import { NavController, NavParams, Events, IonicPage, AlertController } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";

/*
  Generated class for the City page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-city',
  templateUrl: 'city.html'
})
export class CityPage {
  data: any = this.navParams.get('areaList');
  keyword: string = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpService,
    private native: Native,
    public events: Events,
    public alertCtrl: AlertController
  ) { }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CityPage');
  }
  ngOnInit() {
    this.getData();
  }
  switcher(region) {
    if (!region) {
      return false;
    }
    this.httpService.editArea({ id: region.region_id }).then((res) => {
      if (res.status == 1) {
        this.events.publish('home:updataArea');
        this.events.publish('car:update');
        this.native.showToast('切换至' + region.region_name);
        this.navCtrl.popToRoot();
      }
    })
  }
  getData() {
    this.httpService.indexs().then((res) => {
      if (res.status == 1) {
        this.data = res.data.getAreaList
        if(!this.data.length){
          this.alertCtrl.create({
          cssClass: 'alert-style',
          title: '提示',
          subTitle: '您还未申请开通城市',
          buttons: [{
            text: '去开通',
            handler: () => { this.navCtrl.push('DredgeMoreCityPage'); }
          }, {
            text: '取消',
            handler: () => { this.navCtrl.popToRoot(); }
          }],
        }).present();
        }
      }
    })
  }
  search() {
    this.httpService.getAreaList({ keyword: this.keyword }).then((res) => {
      if (res.status == 1) {
        this.data = res.data;
      }
    })
  }
}
