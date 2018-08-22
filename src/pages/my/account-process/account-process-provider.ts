import { Injectable } from '@angular/core';
import { HttpService } from '../../../providers/http-service';
import { Native } from '../../../providers/native';
import { ModalController, App } from 'ionic-angular';

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
   ) {
      console.log('Hello AccountProcessProvider Provider');
   }

   /**
    * 扫描二维码
    * @param index 加工单下标
    * @param type 镜架2或者镜片1
    */
   openScanner(index, type) {
    return new Promise<any>((resolve, reject) => {
      //  this.app.getActiveNav().push('ScanPage', {
        //  callback: (data) => {
            let data
            if (this.flag) {
               this.flag = !this.flag
               data = '{"machine":"6978","sn":"201001231118900001"}';
            } else {
               this.flag = !this.flag
               data = '{"machine":"11103","sn":"501000711126500001"}';
            }
            try {
               let json = JSON.parse(data);
               if (json.machine) {
                  
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
            } catch (error) {
               this.native.showToast('格式错误');
            }
        //  }
      // })
    });
  }
}
