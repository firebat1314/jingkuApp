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
import { ImagePicker } from "@ionic-native/image-picker";
import { CallNumber } from '@ionic-native/call-number';
import { Camera } from '@ionic-native/camera';
import { Toast } from '@ionic-native/toast';
import { AppVersion } from '@ionic-native/app-version';
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { AndroidFullScreen } from "@ionic-native/android-full-screen";
import { Badge } from '@ionic-native/badge';
/*———————————————————————————————— 插件 ————————————————————————————————*/
import { MeunItemComponentModule } from "../components/meun-item/meun-item.module";
import { CityPickerModule } from "ionic2-city-picker/dist/city-picker.module";
import { IonicImageViewerModule } from "ionic-img-viewer/dist/ionic-img-viewer";

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      platforms:{
        ios: {}
      },
      backButtonText: '',
      // mode:'md',
      tabsHideOnSubPages: true,
      tabsPlacement: 'bottom',
      // activator: "highlight"
      backButtonIcon:'ios-arrow-back-outline'
    }),
    IonicStorageModule.forRoot(),
    HttpModule,
    BrowserModule,
    MeunItemComponentModule,
    IonicImageViewerModule,
    CityPickerModule
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
  ]
})
export class AppModule { }
