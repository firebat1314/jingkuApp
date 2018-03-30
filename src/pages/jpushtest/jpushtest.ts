
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { JPush } from '@jiguang-ionic/jpush';
import { Native } from '../../providers/native';
@IonicPage()
@Component({
  selector: 'page-jpushtest',
  templateUrl: 'jpushtest.html',
})
export class JpushtestPage {

  public registrationId: string;

  sequence: number = 0;

  constructor(
    public navCtrl: NavController,
    public jpush: JPush,
    public nativeService: Native,
  ) {}
  getRegistrationID() {
    this.jpush.getRegistrationID()
      .then(rId => {
        this.registrationId = rId;
        alert(rId)
      })
      .catch(res => {
        alert(res)
      });
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

  setTags() {
    this.jpush.setTags({ sequence: this.sequence++, tags: ['Tag1', 'Tag2'] })
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  addTags() {
    this.jpush.addTags({ sequence: this.sequence++, tags: ['Tag3', 'Tag4'] })
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  checkTagBindState() {
    this.jpush.checkTagBindState({ sequence: this.sequence++, tag: 'Tag1' })
      .then(result => {
        var sequence = result.sequence;
        var tag = result.tag;
        var isBind = result.isBind;
        alert('Sequence: ' + sequence + '\nTag: ' + tag + '\nIsBind: ' + isBind);
      }).catch(this.errorHandler);
  }

  deleteTags() {
    this.jpush.deleteTags({ sequence: this.sequence++, tags: ['Tag4'] })
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  getAllTags() {
    this.jpush.getAllTags({ sequence: this.sequence++ })
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  cleanTags() {
    this.jpush.cleanTags({ sequence: this.sequence++ })
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  setAlias() {
    this.jpush.setAlias({ sequence: this.sequence++, alias: 'TestAlias' })
      .then(this.aliasResultHandler)
      .catch(this.errorHandler);
  }

  getAlias() {
    this.jpush.getAlias({ sequence: this.sequence++ })
      .then(this.aliasResultHandler)
      .catch(this.errorHandler);
  }

  deleteAlias() {
    this.jpush.deleteAlias({ sequence: this.sequence++ })
      .then(this.aliasResultHandler)
      .catch(this.errorHandler);
  }

  addLocalNotification() {
    if (this.nativeService.isAndroid()) {
      this.jpush.addLocalNotification(0, 'Hello JPush', 'JPush', 1, 0);
    } else {
      this.jpush.addLocalNotificationForIOS(0, 'Hello JPush', 1, 'localNoti1');
    }
  }
}