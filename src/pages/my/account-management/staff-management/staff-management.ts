import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController, ToastController, Events } from 'ionic-angular';
import { HttpService } from '../../../../providers/http-service';

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
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffManagementPage');
  }

  ngOnInit() {
    this.events.subscribe('staff:save', this.getData.bind(this))
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
                  closeButtonText:'X'
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
