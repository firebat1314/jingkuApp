import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { AlertController, Platform, App } from 'ionic-angular';
import { Native } from './native';
import { IP, version, version_m } from "./constants";
import { HttpService } from './http-service';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/*
  Generated class for the UpgradeProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UpgradeProvider {

  constructor(
    private transfer: Transfer,
    private file: File,
    private alertCtrl: AlertController,
    private native: Native,
    private httpService: HttpService,
    private iab: InAppBrowser,
    private app: App,
    private platform: Platform
  ) {
    console.log('Hello UpgradeProvider Provider');
  }

  /**
* 检查app是否需要升级
*/
  detectionUpgrade() {
    //这里连接后台获取app最新版本号,然后与当前app版本号(this.getVersionNumber())对比
    //版本号不一样就需要申请,不需要升级就return
    this.httpService.versionInfo().then((res) => {
      if (this.native.isIos()) {
        if (String(version) < res.ios.version) {
          if (res.ios.must) {
            this.alertCtrl.create({
              title: '升级',
              subTitle: '发现新版本,是否立即升级？',
              message: '',
              enableBackdropDismiss: false,
              buttons: [
                {
                  text: '确定',
                  handler: () => {
                    this.iab.create(res.ios.url, '_system');
                    setTimeout(() => {
                      this.platform.exitApp();
                    }, 400);
                  }
                }
              ]
            }).present();
          } else {
            this.alertCtrl.create({
              title: '升级',
              subTitle: '发现新版本,是否立即升级？',
              message: '',
              enableBackdropDismiss: false,
              buttons: [{ text: '取消' },
              {
                text: '确定',
                handler: () => {
                  this.iab.create(res.ios.url, '_system');
                }
              }
              ]
            }).present();
          }
        }

      }
      if (this.native.isAndroid()) {
        if (String(version) < res.android.version) {
          if (res.android.must) {
            this.alertCtrl.create({
              title: '升级',
              subTitle: '发现新版本,是否立即升级？',
              message: '',
              enableBackdropDismiss: false,
              buttons: [
                {
                  text: '确定',
                  handler: () => {
                    this.downloadApp(res.android.url);
                  }
                }
              ]
            }).present();
          } else {
            this.alertCtrl.create({
              title: '升级',
              subTitle: '发现新版本,是否立即升级？',
              message: '',
              enableBackdropDismiss: false,
              buttons: [{ text: '取消' },
              {
                text: '确定',
                handler: () => {
                  this.downloadApp(res.android.url);
                }
              }
              ]
            }).present();
          }
        }
      }
      /* if (this.native.isMobileweb()) {
        this.httpService.getStorage('version_m').then((ver) => {
          if (ver != version_m) {
            this.httpService.setStorage('version_m', version_m);
            this.httpService.getStorage('hasLoggedIn').then((hasLoggedIn) => {
              if (hasLoggedIn) {
                this.httpService.removeStorage('token');
                this.alertCtrl.create({
                  title: '镜库',
                  subTitle: '请重新登录',
                  message: '',
                  enableBackdropDismiss: false,
                  buttons: [{
                    text: '确定',
                    handler: () => {
                      this.app.getRootNav().setRoot('LoginPage', {}, { animate: true });
                      this.httpService.setStorage('hasLoggedIn', false);
                      this.httpService.removeStorage("token");
                    }
                  }]
                }).present();
              }
            })
          }
        })
      } */
      /* if (this.native.isMobileweb()) {
          if (String(version_m) != res.mobileweb.version) {
            this.httpService.setStorage('version_m', version_m);
            location.reload();
          }
      } */
    })
  }

	/**
	 * 下载安装app
	 */
  downloadApp(url) {
    let alert = this.alertCtrl.create({
      title: '下载进度：0%',
      enableBackdropDismiss: false,
      buttons: ['后台下载']
    });
    alert.present();

    const fileTransfer: TransferObject = this.transfer.create();
    const apk = this.file.externalRootDirectory + 'jingku.apk'; //apk保存的目录

    fileTransfer.download(url, apk).then(() => {
      window['install'].install(apk.replace('file://', ''));
    });

    fileTransfer.onProgress((event: ProgressEvent) => {
      let num = Math.floor(event.loaded / event.total * 100);
      if (num === 100) {
        alert.dismiss();
      } else {
        let title = document.getElementsByClassName('alert-title')[0];
        title && (title.innerHTML = '下载进度：' + num + '%');
      }
    });

    /**
     * 通过浏览器打开url
     */
    //  openUrlByBrowser(url:string):void {
    // 	this.inAppBrowser.create(url, '_system');
    //  }
  }
}
