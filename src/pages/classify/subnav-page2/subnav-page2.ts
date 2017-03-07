import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';

/*
  Generated class for the SubnavPage2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-subnav-page2',
  templateUrl: 'subnav-page2.html'
})
export class SubnavPage2Page {
  @ViewChild(Content) myContent: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubnavPage2Page');
  }
  ngAfterViewChecked(){
    console.log(this.myContent.contentBottom)
    
  }
  ngAfterViewInit() {

  }
}
