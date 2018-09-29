import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Native } from '../../../../providers/native';
import { HttpService } from '../../../../providers/http-service';

/**
 * Generated class for the DistributionQualificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
   selector: 'page-distribution-qualification',
   templateUrl: 'distribution-qualification.html',
})
export class DistributionQualificationPage {
   cityData: any;//城市json
   data: any;//默认数据
   cityName: string = '请选择';//默认城市名称
   checks: boolean;//审核状态

   params: any;

   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public events: Events,
      public httpService: HttpService,
      public native: Native,
   ) {
   }

   ionViewDidLoad() {
   }
   ngOnInit() {
      this.httpService.FileJsonRegion().then(data => {
         this.cityData = JSON.parse(data.data);
         this.getData();
      });
   }
   getData() {
      this.httpService.get_enterprise_info().then((res) => {
         if (res.status) {
            this.data = res;
            this.checks = res.data.is_distribution == '1' ? true : false;
            this.params = {
               company: res.data.company,//企业名称
               province: res.data.province,//省
               city: res.data.city,//市
               district: res.data.district,//区
               address: res.data.address,//经营地址
               zctel: res.data.zctel,//注册电话
               xk: res.data.xk,//银行开户许可证
               yyzzsn: res.data.yyzzsn,//营业执照编号
               fr: res.data.fr,//法人姓名
               code_sn: res.data.code_sn,//身份证号
               mobile: res.data.mobile,//手机号
               zhizhao: null,//营业执照
               fsfz: null,//身份证正
               zsfz: null,//身份证反
               medical: null,
               brank_permit: null,
               code_validity_start: res.data.code_validity_start,
               code_validity_end: res.data.code_validity_end,
               zz_validity_start: res.data.zz_validity_start,
               zz_validity_end: res.data.zz_validity_end,
            }
            if (res.data.province != 0 || res.data.city != 0 || res.data.district != 0) {
               this.cityName = this.getCityName(res.data.province, res.data.city, res.data.district)
            }
         }
      })
   }
   getCityName(province, city, district) {
      let arr = [];
      for (let p = 0; p < this.cityData.length; p++) {
         if (this.cityData[p].code == province) {
            arr.push(this.cityData[p].name);
         }
         for (let c = 0; c < this.cityData[p].children.length; c++) {
            if (this.cityData[p].children[c].code == city) {
               arr.push(this.cityData[p].children[c].name);
            }
            var items = this.cityData[p].children[c].children;
            if (items) {
               for (let d = 0; d < items.length; d++) {
                  if (items[d].code == district) {
                     arr.push(items[d].name);
                  }
               }
            }
         }
      }
      return arr.join('-');
   }
   /**
    * 城市选择器被改变时触发的事件
    * @param event
    */
   cityChange(event) {
      this.params.city = event.city.value;
      this.params.province = event.province.value;
      this.params.district = event.region.value;
   }
   submit() {
      this.httpService.Distribution_info(this.params).then((res) => {
         if (res.status) {
            this.native.openAlertBox(res.info, () => {
               this.navCtrl.pop().catch(res => { history.back() });
            }, () => {

            });
         }
      })
   }
}
