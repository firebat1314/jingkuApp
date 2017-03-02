import { NgModule, ErrorHandler } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { BrowserModule } from "@angular/platform-browser";
/*页面*/
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MyPage } from '../pages/my/my';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SignupSecondPage } from '../pages/signup/signup-second/signup-second';
import { SignupThirdPage } from '../pages/signup/signup-third/signup-third';
import { DirectiveTestPage } from "../pages/directive-test/directive-test";
import { ForgotPage } from "../pages/forgot/forgot";
import { ForgotTwoPage } from "../pages/forgot/forgot-two/forgot-two";
import { ForgotThreePage } from "../pages/forgot/forgot-three/forgot-three";
import { CityPage } from '../pages/home/city/city'
import { SearchPage } from '../pages/home/search/search'
import { DetailsPage } from '../pages/home/details/details'
import { BrandListPage } from '../pages/home/brand-list/brand-list'
import { AttentionPage } from '../pages/home/attention/attention'
import { FastbuyPage } from '../pages/home/fastbuy/fastbuy'
import { GlassesDesignPage } from '../pages/home/glasses-design/glasses-design'
import { IntegralstorePage } from '../pages/home/integralstore/integralstore'
import { RechargePage } from '../pages/home/recharge/recharge'
import { WhitebarPage } from '../pages/home/whitebar/whitebar'
import { DiscountCouponPage } from '../pages/home/discount-coupon/discount-coupon'
import { MessagePage } from '../pages/home/message/message'
import { ParticularsPage } from '../pages/home/particulars/particulars'
/*服务*/
import { UserData } from "../services/user-data";
import { Native } from "../providers/native";
import { HttpService } from "../providers/http-service";
/*指令*/
import { MyDirective } from "../components/my-directive/my-directive";
import { ImgTabs } from "../components/img-tabs/img-tabs";
/*组件*/
import { SingleCardComponent } from '../components/single-card/single-card'
import { MyToolbarComponent } from '../components/my-toolbar/my-toolbar'
import { SingleFoodsItemComponent } from '../components/single-foods-item/single-foods-item'
import { MeunItemComponent } from '../components/meun-item/meun-item'
import { CountdownComponent } from '../components/countdown/countdown'

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage, CityPage, SearchPage, DetailsPage, BrandListPage, AttentionPage, FastbuyPage, GlassesDesignPage, IntegralstorePage, RechargePage,WhitebarPage,DiscountCouponPage,MessagePage,ParticularsPage,
    MyPage,
    TabsPage,
    WelcomePage,
    LoginPage,
    SignupPage, SignupSecondPage, SignupThirdPage,
    MyDirective, ImgTabs,
    SingleCardComponent,MyToolbarComponent,SingleFoodsItemComponent,MeunItemComponent,CountdownComponent,
    DirectiveTestPage,
    ForgotPage, ForgotTwoPage, ForgotThreePage,
    
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      tabsHideOnSubPages: true,
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition'
    }, {
        links: [
          { component: HomePage, segment: 'home' },
          { component: CityPage, segment: 'city' }
        ]
      }),
    BrowserModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage, CityPage, SearchPage, DetailsPage, BrandListPage, AttentionPage, FastbuyPage, GlassesDesignPage, IntegralstorePage, RechargePage,WhitebarPage,DiscountCouponPage,MessagePage,ParticularsPage,
    MyPage,
    TabsPage,
    WelcomePage,
    LoginPage,
    SignupPage, SignupSecondPage, SignupThirdPage,
    SingleCardComponent,MyToolbarComponent,SingleFoodsItemComponent,MeunItemComponent,CountdownComponent,
    DirectiveTestPage,
    ForgotPage, ForgotTwoPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, Storage, UserData, Native, HttpService]
})
export class AppModule { }
