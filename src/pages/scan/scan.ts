import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, IonicPage, ModalController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Native } from '../../providers/native';
import { HttpService } from '../../providers/http-service';
/**
 * Generated class for the ScanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {
  frontCamera: boolean;
  light: boolean;
  isShow: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private qrScanner: QRScanner,
    private viewCtrl: ViewController,
    private native: Native,
    private httpService: HttpService,
    private modalCtrl: ModalController,

  ) {
    this.light = false;
    this.frontCamera = false;
    this.isShow = true;
  }

  ionViewDidEnter() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
    // Optionally request the permission early
    return this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          // start scanning
          this.qrScanner.show();
          let scanSub = this.qrScanner.scan().subscribe((text) => {
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            // show camera preview
            let json = JSON.parse(text);
            
            if (json.machine) {
              this.httpService.SpecialMachiningGoodsInfo({ id: json['machine'] }).then(res => {
                if (res.status == 1) {
                  if (res.is_true) {
                    this.native.openAlertBox(
                      '已存在加工单，是否前往加工',
                      () => {
                        this.navCtrl.push('AddProcessPage', { is_scanner: 1 });
                      },
                      () => {
                        let modal = this.modalCtrl.create('ParticularsModalAttrPage', {
                          headData: res.info,
                          scannerId: json['machine'],
                          cutId: json['machine']//这里为任意值
                        }, { cssClass: 'my-modal-style' });
                        modal.onDidDismiss(data => {
                          if (!data) return;
                          data(this.navCtrl);
                        });
                        modal.present();
                      })
                  } else {
                    let modal = this.modalCtrl.create('ParticularsModalAttrPage', {
                      headData: res.info,
                      scannerId: json['machine'],
                      cutId: json['machine']//这里为任意值
                    }, { cssClass: 'my-modal-style' });
                    modal.onDidDismiss(data => {
                      if (!data) return;
                      data(this.navCtrl);
                    });
                    modal.present();
                  }
                } else {
                  this.native.showToast(res.info);
                }
              })
            }
          })


        } else if (status.denied) {
          this.native.showToast('没有相机访问权限');
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }
  ngOnDestroy() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    this.qrScanner.hide();//需要关闭扫描，否则相机一直开着
  }
  /**
   * 闪光灯控制，默认关闭
   */
  toggleLight() {
    if (this.light) {
      this.qrScanner.disableLight();
    } else {
      this.qrScanner.enableLight();
    }
    this.light = !this.light;
  }

  /**
   * 前后摄像头互换
   */
  toggleCamera() {
    if (this.frontCamera) {
      this.qrScanner.useBackCamera();
    } else {
      this.qrScanner.useFrontCamera();
    }
    this.frontCamera = !this.frontCamera;
  }

}
