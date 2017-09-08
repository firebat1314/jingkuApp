import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { AlertController } from 'ionic-angular';
import { Native } from './native';
import { IP } from "./constants";
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
    private iab: InAppBrowser
  ) {
    console.log('Hello UpgradeProvider Provider');
  }

  /**
* 检查app是否需要升级
*/
  detectionUpgrade() {
    //这里连接后台获取app最新版本号,然后与当前app版本号(this.getVersionNumber())对比
    //版本号不一样就需要申请,不需要升级就return
    this.native.getVersionNumber().then((version) => {
      console.log("版本信息：" + version);
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
                      // this.platform.exitApp();
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
                    // this.platform.exitApp();
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
                      // this.platform.exitApp();
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
                    // this.platform.exitApp();
                  }
                }
                ]
              }).present();
            }
          }
        }
      })
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
