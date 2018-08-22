import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, IonicPage, ModalController, Events } from 'ionic-angular';
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
   callback: Function = this.navParams.get('callback');

   constructor(public navCtrl: NavController, public navParams: NavParams,
      private qrScanner: QRScanner,
      private viewCtrl: ViewController,
      private native: Native,
      private httpService: HttpService,
      private modalCtrl: ModalController,
      private events: Events,

   ) {
      this.light = false;
      this.frontCamera = false;
      this.isShow = true;
   }

   ionViewDidEnter() {
      // Optionally request the permission early
      this.qrScanner.prepare()
         .then((status: QRScannerStatus) => {
            if (status.authorized) {
               this.qrScanner.show().then(() => {
                  (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
               });
               // camera permission was granted
               // start scanning
               let scanSub = this.qrScanner.scan().subscribe((text) => {
                  this.qrScanner.destroy(); // hide camera preview
                  this.navCtrl.pop().then(() => {
                     this.callback && this.callback(text);
                  });
                  scanSub.unsubscribe(); // stop scanning
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
   /* ionViewDidLeave(){
    this.callback&&this.callback(12312312312312);
   } */
   ionViewCanLeave() {
      (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
      this.qrScanner.destroy();//需要关闭扫描，否则相机一直开着
      return true;
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
