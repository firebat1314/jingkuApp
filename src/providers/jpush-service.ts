import { Injectable } from '@angular/core';
import { Native } from "./native";
import { Storage } from '@ionic/storage';
import { JPush } from '@jiguang-ionic/jpush';

/*
  Generated class for the JpushService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class JpushService {
  public registrationId: string;

  sequence: number = 0;

  constructor(public storage: Storage, public jpush: JPush, public nativeService: Native) {

    document.addEventListener('jpush.receiveNotification', (event: any) => {
      var content;
      if (this.nativeService.isAndroid()) {
        content = event.alert;
      } else {
        content = event.aps.alert;
      }
      alert('Receive notification: ' + JSON.stringify(event));
    }, false);

    document.addEventListener('jpush.openNotification', (event: any) => {
      var content;
      if (this.nativeService.isAndroid()) {
        content = event.alert;
      } else {  // iOS
        if (event.aps == undefined) { // 本地通知
          content = event.content;
        } else {  // APNS
          content = event.aps.alert;
        }
      }
      alert('open notification: ' + JSON.stringify(event));
    }, false);

    document.addEventListener('jpush.receiveLocalNotification', (event: any) => {
      // iOS(*,9) Only , iOS(10,*) 将在 jpush.openNotification 和 jpush.receiveNotification 中触发。
      var content;
      if (this.nativeService.isAndroid()) {
      } else {
        content = event.content;
      }
      alert('receive local notification: ' + JSON.stringify(event));
    }, false);
  }
  init() {
    return this.jpush.init().catch(err=>console.log(err));
  }
  setDebugMode(isDebug: boolean){
    return this.jpush.setDebugMode(isDebug).catch(err=>console.log(err));
  }
  isPushStopped(successCallback?) {
    return this.jpush.isPushStopped().catch(err=>console.log(err));
  }
  stopPush(successCallback?) {
    return this.jpush.stopPush().catch(err=>console.log(err));
  }
  resumePush(successCallback?) {
    return this.jpush.resumePush().catch(err=>console.log(err));
  }
  getRegistrationID() {
    return this.jpush.getRegistrationID()
      .then(rId => {
        this.registrationId = rId;
      }).catch(err=>console.log(err));
  }
  tagResultHandler = function (result) {
    var sequence: number = result.sequence;
    var tags: Array<string> = result.tags == null ? [] : result.tags;
    alert('Success!' + '\nSequence: ' + sequence + '\nTags: ' + tags.toString());
  };

  aliasResultHandler = function (result) {
    var sequence: number = result.sequence;
    var alias: string = result.alias;
    alert('Success!' + '\nSequence: ' + sequence + '\nAlias: ' + alias);
  };

  errorHandler = function (err) {
    var sequence: number = err.sequence;
    var code = err.code;
    alert('Error!' + '\nSequence: ' + sequence + '\nCode: ' + code);
  };

  setTags(tags?: Array<string>) {
    this.jpush.setTags({ sequence: this.sequence++, tags: [...tags] })
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
        alert('Sequence: ' + sequence + '\nTag: ' + tag + '\nIsBind: ' + isBind);
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

  setAlias() {
    return this.jpush.setAlias({ sequence: this.sequence++, alias: 'TestAlias' })
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

  addLocalNotification() {
    if (this.nativeService.isAndroid()) {
      return this.jpush.addLocalNotification(0, 'Hello JPush', 'JPush', 1, 5000);
    } else {
      return this.jpush.addLocalNotificationForIOS(5, 'Hello JPush', 1, 'localNoti1');
    }
  }

}