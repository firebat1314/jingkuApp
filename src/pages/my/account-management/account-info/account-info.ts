import { Component } from '@angular/core';
import { NavController, NavParams, Events, ActionSheetController, IonicPage } from 'ionic-angular';
import { Native } from "../../../../providers/native";
import { HttpService } from "../../../../providers/http-service";

/*
  Generated class for the AccountInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-account-info',
  templateUrl: 'account-info.html'
})
export class AccountInfoPage {
  userInfo: any;
  RealnamePage = 'RealnamePage';
  QqPage = 'QqPage';
  CompanynamePage = 'CompanynamePage';
  AddressPage = 'AddressPage';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public events: Events,
    public actionSheetCtrl: ActionSheetController,
    public native: Native
  ) {

  }
  ngOnInit(){
    this.httpService.getStorage('username').then((res) => {
      if (res) {
        this.httpService.getStorage(res+'_userInfo').then((res) => {
          if (res) {
            this.userInfo = res;
          }
        })
      }
    })
    this.getUserData();
    this.events.subscribe('userInfo:editOk', () => {
      this.getUserData();
    })
  }
  getUserData() {
    this.httpService.userInfo().then((res) => {
      // console.log(res);
      this.userInfo = res;
      this.httpService.getStorage('username').then((res) => {
        if (res) {
          this.httpService.setStorage(res + '_userInfo', this.userInfo)
        }
      })
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountInfoPage');
  }
  ngOnDestroy() {
    this.events.unsubscribe('userInfo:editOk');
  }
  editAvatar(data) {
    this.httpService.editAvatar({ avatar: data }).then((res) => {
      if (res.status == 1) {
        this.native.showToast('头像已更新');
        this.getUserData();
        this.events.publish('my:update',data);
      }
    }).catch(() => {
      this.native.showToast('上传失败，请重试')
    })
  }
}
