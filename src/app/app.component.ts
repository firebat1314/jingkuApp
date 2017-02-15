import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, public storage: Storage) {
    // 初次进入app引导页面
    this.storage.get('hasLoggedIn').then((result) => {
      if (result) {
        this.rootPage = TabsPage;
      } else {
        this.storage.get('firstIn').then((result) => {
          if (result) {
            this.rootPage = LoginPage;
          } else {
            this.rootPage = WelcomePage;
            this.storage.set('firstIn', 'NO');
          }
        }
        )
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      Splashscreen.hide();
      StatusBar.overlaysWebView(false); // let status bar overlay webview
      StatusBar.backgroundColorByHexString('#bdbdbd'); // set status bar to white
    });
  }
}
