import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the IframeBrowserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-iframe-browser',
  templateUrl: 'iframe-browser.html',
})
export class IframeBrowserPage {
  srcUrl: any = this.navParams.get('url');
  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {
    this.srcUrl = this.sanitizer.bypassSecurityTrustResourceUrl(navParams.get('url'));
    console.log(this.srcUrl)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IframeBrowserPage');
  }

}
