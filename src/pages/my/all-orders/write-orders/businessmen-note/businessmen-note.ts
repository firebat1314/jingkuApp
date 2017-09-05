import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, Events, AlertController } from 'ionic-angular';
import { HttpService } from "../../../../../providers/http-service";

/**
 * Generated class for the BusinessmenNotePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-businessmen-note',
  templateUrl: 'businessmen-note.html',
})
export class BusinessmenNotePage {
  badge: { name: string; selected: number; }[];
  data: any;
  callback: any;
  badgeStr: Array<string> = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public events: Events,
    public alertCtrl: AlertController,
  ) {
    /* this.callback = this.navParams.get('callback')
    console.log(this.callback)
    this.callback('sss').then((res)=>{
      // console.log(res)
    }) */
    this.getData();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessmenNotePage');
  }
  ionViewWillLeave() {
    this.writeNotes().then(()=>{

    },()=>{
      
    })
  } /* 
   ionViewCanLeave() {
    return this.writeNotes().then(() => {
      this.events.publish('writeOrder:refresh');
      return true
    }, () => {
      return this.alertCtrl.create({
        cssClass: 'alert-style',
        title: '没有填写备注，是否继续填写',
        buttons: [
          {
            text: '取消',
            handler: () => {
              return true
            }
          },
          {
            text: '确认',
            handler: () => {
              return false
            }
          }
        ],
      }).present();
    })
  }  */
  getData() {
    return this.httpService.checkout().then((res) => {
      this.data = res;
      for (var i in this.data.cart_goods_list) {
        this.data.cart_goods_list[i].badge = [
          {
            name: '加急',
            selected: 0
          }, {
            name: '不放货单',
            selected: 0
          }, {
            name: '今天发出',
            selected: 0
          }, {
            name: '来镜加工',
            selected: 0
          },
        ]
      }
    })
  }
  checkBadge(item, items) {
    var index = items.badgeStr.indexOf(item.name);
    if (item.selected) {
      item.selected = 0;
    } else {
      item.selected = 1;
      if (index > -1) {
        items.badgeStr.splice(index, 1)
      } else {
        items.badgeStr.push(item.name)
      }
    }
  }
  writeNotes() {
    let commentArr = [];
    let suppliers = [];

    for (var i in this.data.suppliers_notes) {
      if (this.data.suppliers_notes[i]) {
        commentArr.push(this.data.suppliers_notes[i])
        suppliers.push(i)
      }
    }
    return new Promise((resolve, reject) => {
      this.httpService.writeNotes({
        notes: {
          note: commentArr,
          suppliers: suppliers
        }
      }).then((res) => {
        if (res.status == 1) {
          this.events.publish('writeOrder:refresh');
          resolve();
        } else {
          this.events.publish('writeOrder:refresh');
          reject();
        }
      })
    })
  }
}
