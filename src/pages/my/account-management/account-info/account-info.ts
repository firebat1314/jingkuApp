import { Component } from '@angular/core';
import { NavController, NavParams, Events, ActionSheetController, IonicPage, AlertController } from 'ionic-angular';
import { Native } from "../../../../providers/native";
import { HttpService } from "../../../../providers/http-service";
import { phone_nember } from '../../../../providers/constants';

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
  medical: any;
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
    private alertCtrl: AlertController,
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
  editAvatar() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '拍照上传',
          role: 'destructive',
          handler: () => {
            this.native.getPictureByCamera({
              allowEdit:true
            }).then((data) => {
              this.uploadAvatar(data);
            })
          }
        },
        {
          text: '本地上传',
          handler: () => {
            this.native.getPictureByPhotoLibrary({
              allowEdit:true
            }).then((data) => {
              this.uploadAvatar(data);
            })
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    actionSheet.present();
  }
  uploadAvatar(data) {
    this.httpService.editAvatar({ avatar: 'data:image/jpeg;base64,' + data }).then((res) => {
      if (res.status == 1) {
        this.native.showToast('头像已更新');
        this.getUserData();
        this.events.publish('my:update','data:image/jpeg;base64,' + data);
      }
    })
  }
  editMedical(data){
    this.httpService.editMedical({medical:data}).then(res => {
      if(res.status){
        this.medical = data;
        this.alertCtrl.create({
          title: '镜库科技',
          message: res.info,
          buttons: [
            {
              text: '拨打电话',
              handler: () => {
                location.href = "tel:" + phone_nember;
              }
            },
            {
              text: '确定',
            }
          ]
        }).present();
      }
    })
  }
}
