import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { BrowserModule } from "@angular/platform-browser";
import { IonicStorageModule } from '@ionic/storage';
/*———————————————————————————————— base页 ————————————————————————————————*/
import { MyApp } from './app.component';
/*———————————————————————————————— 服务 ————————————————————————————————*/
import { UserData } from "../providers/user-data";
import { Native } from "../providers/native";
import { HttpService } from "../providers/http-service";
import { JpushService } from "../providers/jpush-service";
/*———————————————————————————————— ionic-native ————————————————————————————————*/
import { AppVersion } from '@ionic-native/app-version';
import { AndroidFullScreen } from "@ionic-native/android-full-screen";
import { Badge } from '@ionic-native/badge';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { ImagePicker } from "@ionic-native/image-picker";
import { CallNumber } from '@ionic-native/call-number';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Toast } from '@ionic-native/toast';
import { Transfer } from "@ionic-native/transfer";
import { File } from '@ionic-native/file';
import { InAppBrowser } from '@ionic-native/in-app-browser';
/*———————————————————————————————— 插件 ————————————————————————————————*/
import { MeunItemComponentModule } from "../components/meun-item/meun-item.module";
import { CityPickerModule } from "ionic2-city-picker/dist/city-picker.module";
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { IonicImageLoader } from 'ionic-image-loader';
import { UpgradeProvider } from '../providers/upgrade/upgrade';
import { WxServiceProvider } from '../providers/wx-service/wx-service';
import { QimoChatProvider } from '../providers/qimo-chat/qimo-chat';
import { XimuProvider } from '../providers/ximu/ximu';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      platforms: {
        ios: {

        },
        android:{
          backButtonIcon:'ios-arrow-back'
        }
      },
      backButtonText: '',
      // mode: 'ios',
      tabsHideOnSubPages: true,
      tabsPlacement: 'bottom',
      swipeBackEnabled: false,
      // activator: "highlight",
    }),
    IonicStorageModule.forRoot(),
    IonicImageLoader.forRoot(),
    HttpModule,
    BrowserModule,
    MeunItemComponentModule,
    IonicImageViewerModule,
    CityPickerModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserData,
    Native,
    HttpService,
    JpushService,
    UpgradeProvider,
    Camera,
    ImagePicker,
    AppVersion,
    Toast,
    CallNumber,
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    AndroidFullScreen,
    Badge,
    Transfer,
    File,
    InAppBrowser,
    WxServiceProvider,
    QimoChatProvider,
    XimuProvider
  ]
})
export class AppModule { }
