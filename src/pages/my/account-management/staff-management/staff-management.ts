import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController, ToastController, Events, ActionSheetController } from 'ionic-angular';
import { HttpService } from '../../../../providers/http-service';
import { MineProvider } from '../../../../providers/mine/mine';

/**
 * Generated class for the StaffManagementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-staff-management',
  templateUrl: 'staff-management.html',
})
export class StaffManagementPage {

  userInfo: any;
  list: any;
  infiniteScroll: any;
  data: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpServ: HttpService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public events: Events,
    public actionSheetCtrl: ActionSheetController,
    public mine: MineProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffManagementPage');
  }

  ngOnInit() {
    this.events.subscribe('staff:save', ()=>{
      this.getData.call(this);
      this.mine.changeUser();//改变用户信息观察者对象
    })
    this.getData()
  }

  ngOnDestroy() {
    this.events.unsubscribe('staff:save')
  }
  getData() {
    this.httpServ.staffIndex({ page: 1 }, { showLoading: true }).then(res => {
      if (res.status) {
        this.data = res;
        this.list = res.list;
      }
    })
  }
  getType() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '注册新账号',
          role: 'new'
        }, {
          text: '添加已有账号，立即验证',
          role: 'yet'
        },
        {
          text: '取消',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
    return new Promise((resolve, reject) => {
      actionSheet.onDidDismiss((data, role) => {
        if (role == 'cancel') {
          reject(role)
        } else {
          this.navCtrl.push('AddStaffPage', { role: role });
          resolve(role)
        }
      });
    }).catch(res => { return res })
  }
  doRefresh(refresher) {
    this.infiniteScroll ? this.infiniteScroll.enable(true) : null;
    this.httpServ.staffIndex({ page: 1 }, { showLoading: false }).then(res => {
      setTimeout(() => {
        refresher.complete();
      }, 500);
      if (res.status) {
        this.data = res;
        this.list = res.list;
      }
    })
  }
  deleteItem(user_id) {
    let confirm = this.alertCtrl.create({
      cssClass: 'alert-style',
      title: '删除该账号？',
      buttons: [
        {
          text: '确认',
          handler: () => {
            this.httpServ.staffDelUser({ user_id: user_id }).then(res => {
              if (res.status == 1) {
                this.toastCtrl.create({
                  message: '删除成功',
                  duration: 2000,
                  position: 'top',
                  showCloseButton: false,
                  closeButtonText: 'X'
                }).present();
              }
            })
          }
        }, {
          text: '取消',
        }
      ],
    });
    confirm.present();
  }
  doInfinite(infiniteScroll?) {
    this.infiniteScroll = infiniteScroll;
    if (this.data.page < this.data.pages) {
      let p = this.data.page;
      this.httpServ.staffIndex({ page: ++p }, { showLoading: false }).then((res) => {
        if (res.status == 1) {
          this.data = res;
          this.list = [...this.list, ...res.list]
        }
        setTimeout(() => {
          this.infiniteScroll.complete();
        }, 500);
      })
    } else {
      this.infiniteScroll.enable(false);
    }
  }
}
