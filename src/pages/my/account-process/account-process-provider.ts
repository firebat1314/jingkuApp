import { Injectable } from '@angular/core';
import { HttpService } from '../../../providers/http-service';
import { Native } from '../../../providers/native';
import { ModalController, App } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/*
  Generated class for the AccountProcessProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccountProcessProvider {
  flag: any;

  constructor(
    private httpService: HttpService,
    private native: Native,
    private modalCtrl: ModalController,
    private app: App,
    private ib: InAppBrowser,
  ) {
    console.log('Hello AccountProcessProvider Provider');
  }

  /**
   * 扫描二维码
   * @param index 加工单下标
   * @param type 镜架2或者镜片1
   */
  openScanner(index?, type?) {
    return new Promise<any>((resolve, reject) => {
      this.app.getActiveNav().push('ScanPage', {
        callback: (scandata) => {
          /* var scandata;
          if (this.flag) {
             this.flag = !this.flag
             scandata = '{"group":"5968"}';
             scandata = 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=25017023_10_pg&wd=%E4%BA%8C%E7%BB%B4%E7%A0%81%E9%93%BE%E6%8E%A5%E6%8F%90%E5%8F%96%E5%8F%82%E6%95%B0&oq=%25E4%25BA%258C%25E7%25BB%25B4%25E7%25A0%2581%25E9%2593%25BE%25E6%258E%25A5%25E6%258F%2590%25E5%258F%2596&rsv_pq=ec5134980003234a&rsv_t=dddch%2BtI6rvD3r15%2BSDXFQMjqfTHKpF3NwNsg6kbAai0mD9khyY0DJxw3UB3MbqXniFkKvw&rqlang=cn&rsv_enter=1&inputT=52293&sug=%25E4%25BA%258C%25E7%25BB%25B4%25E7%25A0%2581&rsv_sug3=53&rsv_sug1=40&rsv_sug7=100&bs=%E4%BA%8C%E7%BB%B4%E7%A0%81%E9%93%BE%E6%8E%A5%E6%8F%90%E5%8F%96'
             scandata = '{"machine":"6978","sn":"201001231118900001"}';
          } else {
             this.flag = !this.flag
             scandata = '{"machine":"11103","sn":"501000711126500001"}';
          } */
          // var scandata = 'http://www.bjshiweilai.com/base/center/open/qrcode?token=nBPYgyDlQjMbv7N'

          try {
            let json = JSON.parse(scandata);
            if (json.machine) {
              if (type == 3) {//type == 3用于判断是否从首页点扫码
                this.app.getActiveNav().push('ParticularsPage', { goodsId: json['machine'] });
              } else {
                this.httpService.SpecialMachiningGoodsInfo({ id: json['machine'] }).then(res => {
                  if (res.status == 1) {
                    if (res.is_jingjia > 0 && type == 1) {
                      return this.native.showToast('请扫描镜片商品');
                    } else if (res.is_jingpian > 0 && type == 2) {
                      return this.native.showToast('请扫描镜架商品');
                    }

                    let modal = this.modalCtrl.create('ParticularsModalAttrPage', {
                      headData: res.info,
                      scannerId: json['machine'],
                      sn: json['sn'],//
                      cutId: json['machine'],//这里为任意值用于判断切边
                      scannerIndex: index
                    }, { cssClass: 'my-modal-style' });
                    modal.onDidDismiss((data, role) => {
                      if (role == 'openScanner') {
                        resolve(data);
                      }
                    });
                    modal.present();
                  } else {
                    this.native.showToast(res.info);
                  }
                })
              }
            } else if (json.type == 'group') {
              if (type == 3) {//type == 3用于判断是否从首页点扫码
                this.httpService.QrcodeInfo(json).then(res => {
                  if (res.status == 1) {
                    this.app.getActiveNav().push('ParticularsPage', { goodsId: res.id });
                  }
                })
              } else {
                this.native.showToast('请扫描正确的商品');
              }
            } else {

            }
          } catch (error) {
            try {
              let json = this.parseURL(decodeURIComponent(scandata));
              let domain = decodeURIComponent(scandata).split('/')[2];
              if (json['token']) {
                this.httpService.QrcodeInfo({
                  type: 'opc',
                  parameter: json['token'],
                  domain: domain || ''
                }).then(res => {
                  if (res.status == 1) {
                    this.app.getActiveNav().push('ParticularsPage', { goodsId: res.goods_id, sn: res['product_sn'] });
                  }
                })
              } else {
                this.ib.create(scandata, '_system');
              }
            } catch (error) {
              // this.native.showToast('格式错误');
              this.ib.create(scandata, '_system');
            }
          }
        }
      })
    });
  }
  parseURL = (url) => {

    if (url && url.indexOf("?") == -1) return {}

    var startIndex = url.indexOf("?") + 1;
    var str = url.substr(startIndex);
    var strs = str.split("&");
    var param = {}
    for (var i = 0; i < strs.length; i++) {
      var result = strs[i].split("=");
      var key = result[0];
      var value = result[1];
      param[key] = value;
    }
    return param

  }
}
