import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AlertController, Platform, App } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { AppVersion } from '@ionic-native/app-version';
import { HttpService } from '../http-service';
import { Native } from '../native';
// import { IP, version, version_m } from "../constants";

/*
  Generated class for the UpgradeProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UpgradeProvider {

  constructor(
    private alertCtrl: AlertController,
    private native: Native,
    private httpService: HttpService,
    private iab: InAppBrowser,
    private platform: Platform,
   //  private appVersion: AppVersion,
  ) {
    console.log('Hello UpgradeProvider Provider');
  }

  /**
* 检查app是否需要升级
*/
  detectionUpgrade() {
    //这里连接后台获取app最新版本号,然后与当前app版本号(this.getVersionNumber())对比
    //版本号不一样就需要申请,不需要升级就return
    /* this.httpService.versionInfo().then((res) => {
      this.appVersion.getVersionNumber().then((version) => {
        console.log(version);
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
                      return false;
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
                    return false;
                  }
                }
                ]
              }).present();
            }
          }
        }
      }).catch(err => {
         console.log('getVersionNumber:' + err);
       });
    }) */

  }
}
