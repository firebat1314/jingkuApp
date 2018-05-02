import { Injectable } from '@angular/core';
import { Native } from "./native";
import { Storage } from '@ionic/storage';
import { JPush } from '@jiguang-ionic/jpush';
import { NavController, App, NavControllerBase, AlertController } from 'ionic-angular';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
/*
  Generated class for the JpushService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class JpushService {
  public registrationId: string;

  sequence: number = 0;

  constructor(
    public storage: Storage,
    public jpush: JPush,
    public nativeService: Native,
    private alertCtrl: AlertController,
    public appCtrl: App,
    private openNativeSettings: OpenNativeSettings
  ) {

    document.addEventListener('jpush.receiveRegistrationId', (event: any) => {
      console.log('jpush.receiveRegistrationId:', event.registrationId)
    }, false)

    document.addEventListener('jpush.receiveNotification', (event: any) => {
      var content;
      if (this.nativeService.isAndroid()) {
        content = event.alert;
      } else {
        content = event.aps.alert;
      }
      console.log('Receive notification: ', event);
    }, false);

    document.addEventListener('jpush.openNotification', (event: any) => {
      var content;
      let activeNav: NavControllerBase = this.appCtrl.getActiveNav();
      if (this.nativeService.isAndroid()) {
        content = event.alert;
        if (event.extras.goods) {
          activeNav.push('ParticularsPage', { goodsId: event.extras.goods });
        } else if (event.extras.list) {
          activeNav.push('BrandListPage', { listId: event.extras.list });
        } else if (event.extras.order) {
          activeNav.push('OrdersDetailPage', { order_id: event.extras.order });
        } else if (event.extras.page) {
          activeNav.push(event.extras.page);
        }
      } else {  // iOS
        if (event.aps == undefined) { // 本地通知
          content = event.content;
        } else {  // APNS
          content = event.aps.alert;
          if (event.goods) {
            activeNav.push('ParticularsPage', { goodsId: event.goods });
          } else if (event.list) {
            activeNav.push('BrandListPage', { listId: event.list });
          } else if (event.order) {
            activeNav.push('OrdersDetailPage', { order_id: event.order });
          } else if (event.page) {
            activeNav.push(event.page);
          }
        }
      }
      console.log('open notification: ', event);
    }, false);

    document.addEventListener('jpush.receiveLocalNotification', (event: any) => {
      // iOS(*,9) Only , iOS(10,*) 将在 jpush.openNotification 和 jpush.receiveNotification 中触发。
      var content;
      if (this.nativeService.isAndroid()) {
      } else {
        content = event.content;
      }
      console.log('receive local notification: ', event);
    }, false);
  }
  init() {
    return this.jpush.init().then(res => console.log('init', res)).catch(err => console.log('initError', err))
  }
  setDebugMode(isDebug: boolean) {
    return this.jpush.setDebugMode(isDebug).then(res => console.log('result', res)).catch(err => console.log('error', err))
  }
  isPushStopped() {
    return this.jpush.isPushStopped().then(res => { console.log('result', res); return res }).catch(err => console.log('error', err))
  }
  stopPush() {
    return this.jpush.stopPush().then(res => console.log('result', res)).catch(err => console.log('error', err))
  }
  resumePush() {
    return this.jpush.resumePush().then(res => console.log('result', res)).catch(err => console.log('error', err))
  }
  getRegistrationID() {
    return this.jpush.getRegistrationID()
      .then(rId => {
        this.registrationId = rId;
        return rId
      }).catch(err => {console.log('error', err);return err})
  }
  setTags(tags?: Array<string>) {
    return this.jpush.setTags({ sequence: this.sequence++, tags: [...tags] })
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  addTags(tags?: Array<string>) {
    return this.jpush.addTags({ sequence: this.sequence++, tags: [...tags] })
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  checkTagBindState(tags: string = '') {
    return this.jpush.checkTagBindState({ sequence: this.sequence++, tag: tags })
      .then(result => {
        var sequence = result.sequence;
        var tag = result.tag;
        var isBind = result.isBind;
        console.log('Sequence: ' + sequence + '\nTag: ' + tag + '\nIsBind: ' + isBind);
      }).catch(this.errorHandler);
  }

  deleteTags(tags?: Array<string>) {
    return this.jpush.deleteTags({ sequence: this.sequence++, tags: [...tags] })
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  getAllTags() {
    return this.jpush.getAllTags({ sequence: this.sequence++ })
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  cleanTags() {
    this.jpush.cleanTags({ sequence: this.sequence++ })
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  setAlias(alias: string = '') {
    return this.jpush.setAlias({ sequence: this.sequence++, alias: alias })
      .then(this.aliasResultHandler)
      .catch(this.errorHandler);
  }

  getAlias() {
    return this.jpush.getAlias({ sequence: this.sequence++ })
      .then(this.aliasResultHandler)
      .catch(this.errorHandler);
  }

  deleteAlias() {
    return this.jpush.deleteAlias({ sequence: this.sequence++ })
      .then(this.aliasResultHandler)
      .catch(this.errorHandler);
  }

  getUserNotificationSettings() {
    return this.jpush.getUserNotificationSettings().then((result) => {
      if (result == 0) {
        // 系统设置中已关闭应用推送。
        if (this.nativeService.isIos()) {
          this.alertCtrl.create({
            subTitle: 'ios系统设置[通知]中镜库项未打开，无法收到推送，请先去设置。',
            message: '',
            enableBackdropDismiss: false,
            buttons: [
              {
                text: '暂时不要',
                handler: () => {
                }
              }, {
                text: '去设置',
                handler: () => {
                  this.openNativeSettings.open('notification_id').then(res=>{
                    console.log(res)
                  }).catch(()=>{
                    this.nativeService.showToast('打开设置失败，请手动设置')
                  });
                }
              }
            ]
          }).present();
        } else if (this.nativeService.isAndroid()) {
          this.alertCtrl.create({
            subTitle: 'android系统设置[应用]中镜库项未打开通知，无法收到推送，请先去设置。',
            message: '',
            enableBackdropDismiss: false,
            buttons: [
              {
                text: '暂时不要',
                handler: () => {
                }
              }, {
                text: '去设置',
                handler: () => {
                  this.openNativeSettings.open('manage_applications').then(res=>{
                    console.log(res)
                  }).catch(()=>{
                    this.nativeService.showToast('打开设置失败，请手动设置')
                  });
                }
              }
            ]
          }).present();
        }
        return false;
      } else if (result > 0) {
        // 系统设置中打开了应用推送。
        return true;
      }
    }).catch(res => { console.log(res); return false })
  }

  addLocalNotification() {
    if (this.nativeService.isAndroid()) {
      return this.jpush.addLocalNotification(0, 'Hello JPush', 'JPush', 1, 5000);
    } else {
      return this.jpush.addLocalNotificationForIOS(5, 'Hello JPush', 1, 'localNoti1');
    }
  }

  tagResultHandler = function (result) {
    var sequence: number = result.sequence;
    var tags: Array<string> = result.tags == null ? [] : result.tags;
    console.log('Success!' + '\nSequence: ' + sequence + '\nTags: ' + tags.toString());
    return result;
  };

  aliasResultHandler = function (result) {
    var sequence: number = result.sequence;
    var alias: string = result.alias;
    console.log('Success!' + '\nSequence: ' + sequence + '\nAlias: ' + alias);
    return result;
  };

  errorHandler = function (err) {
    var sequence: number = err.sequence;
    var code = err.code;
    console.log('Error!' + '\nSequence: ' + sequence + '\nCode: ' + code);
    return err;
  };
}