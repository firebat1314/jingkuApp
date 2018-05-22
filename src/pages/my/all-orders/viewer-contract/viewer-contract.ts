import { Component, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the ViewerContractPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'viewer-contract/:url'
})
@Component({
  selector: 'page-viewer-contract',
  templateUrl: 'viewer-contract.html',
})
export class ViewerContractPage {

  url: any;
  showLoad: boolean = true;
  @ViewChild('iframe') myIframe: ElementRef
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sanitizer: DomSanitizer,
    private events: Events,
  ) {
  }
  ngOnInit() {
    window['myBack'] = (res) => {
      console.log(res)
      this.navCtrl.pop().catch(() => { history.back() });
      this.events.publish('ViewerContractPage');
    }
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.navParams.get('url'));
  }
  ionViewDidLoad() {
    this.myIframe.nativeElement.onload = (e) => {
      console.log(e);
      this.showLoad = false;
    }
  }
  ionViewWillLeave(){
    this.events.publish('ViewerContractPage');
  }
}
