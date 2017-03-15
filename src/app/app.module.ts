import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { BrowserModule } from "@angular/platform-browser";
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { IonicImageLoader } from 'ionic-image-loader';
/*————————————————————————————————base页————————————————————————————————*/
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { ClassifyPage } from '../pages/classify/classify';
import { CarPage } from '../pages/car/car';
import { MyPage } from '../pages/my/my';
/*————————————————————————————————start————————————————————————————————*/
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SignupSecondPage } from '../pages/signup/signup-second/signup-second';
import { SignupThirdPage } from '../pages/signup/signup-third/signup-third';
import { DirectiveTestPage } from "../pages/directive-test/directive-test";
import { ForgotPage } from "../pages/forgot/forgot";
import { ForgotTwoPage } from "../pages/forgot/forgot-two/forgot-two";
import { ForgotThreePage } from "../pages/forgot/forgot-three/forgot-three";
/*————————————————————————————————home页————————————————————————————————*/
import { CityPage } from '../pages/home/city/city';
import { SearchPage } from '../pages/home/search/search';
import { DetailsPage } from '../pages/home/details/details';
import { BrandListPage } from '../pages/home/brand-list/brand-list';
import { AttentionPage } from '../pages/home/attention/attention';
import { FastbuyPage } from '../pages/home/fastbuy/fastbuy';
import { GlassesDesignPage } from '../pages/home/glasses-design/glasses-design';
import { IntegralstorePage } from '../pages/home/integralstore/integralstore';
import { RechargePage } from '../pages/home/recharge/recharge';
import { WhitebarPage } from '../pages/home/whitebar/whitebar';
import { DiscountCouponPage } from '../pages/home/discount-coupon/discount-coupon';
import { MessagePage } from '../pages/home/message/message';
import { ParticularsPage } from '../pages/home/particulars/particulars';
import { ParticularsModalPage } from '../pages/home/particulars/particulars-modal/particulars-modal';
import { DredgeMoreCityPage } from '../pages/home/particulars/dredge-more-city/dredge-more-city';
import { PopoverContentPage } from "../pages/home/particulars/dredge-more-city/popover-content/popover-content";
/*————————————————————————————————分类页————————————————————————————————*/
import { SubnavPage1Page } from '../pages/classify/subnav-page1/subnav-page1';
import { SubnavPage2Page } from '../pages/classify/subnav-page2/subnav-page2';
import { MoreBrandPage } from "../pages/classify/more-brand/more-brand";
/*————————————————————————————————购物车页————————————————————————————————*/

/*————————————————————————————————用户中心————————————————————————————————*/

/*-----------用户管理----------*/
import { AccountManagementPage } from "../pages/my/account-management/account-management";
import { ShippingAddressPage } from "../pages/my/account-management/shipping-address/shipping-address";
import { AccountInfoPage } from "../pages/my/account-management/account-info/account-info";
import { MemberCenterPage } from "../pages/my/account-management/member-center/member-center";
import { AccountSecurityPage } from "../pages/my/account-management/account-security/account-security";
import { ChangePhoneNumberPage } from "../pages/my/account-management/account-security/change-phone-number/change-phone-number";
import { ChangePasswordPage } from "../pages/my/account-management/account-security/change-password/change-password";
/*---------------------*/
import { SettingPage } from "../pages/my/setting/setting";
import { AllOrdersPage } from "../pages/my/all-orders/all-orders";
import { CouponPage } from "../pages/my/coupon/coupon";
import { PeceiptPage } from "../pages/my/peceipt/peceipt";
import { AccountAssetPage } from "../pages/my/account-asset/account-asset";
import { AccountHelperPage } from "../pages/my/account-helper/account-helper";
import { AccountServicePage } from "../pages/my/account-service/account-service";
import { AccountHistoryPage } from "../pages/my/account-history/account-history";
import { AccountCollectStorePage } from "../pages/my/account-collect-store/account-collect-store";
import { AccountCollectGoodsPage } from "../pages/my/account-collect-goods/account-collect-goods";
import { AccountAreaApplicationPage } from "../pages/my/account-area-application/account-area-application";
import { AccountProcessPage } from "../pages/my/account-process/account-process";
import { InvoiceQualificationPage } from "../pages/my/peceipt/invoice-qualification/invoice-qualification";
import { InvoiceAskFor2Page } from "../pages/my/peceipt/invoice-ask-for2/invoice-ask-for2";
import { InvoiceAskFor1Page } from "../pages/my/peceipt/invoice-ask-for1/invoice-ask-for1";
import { AboutUsPage } from "../pages/my/setting/about-us/about-us";
/*————————————————————————————————服务————————————————————————————————*/
import { UserData } from "../services/user-data";
import { Native } from "../providers/native";
import { HttpService } from "../providers/http-service";
/*————————————————————————————————指令————————————————————————————————*/
import { MyDirective } from "../components/my-directive/my-directive";
/*————————————————————————————————组件————————————————————————————————*/
import { ImgTabs } from "../components/img-tabs/img-tabs";
import { SingleCardComponent } from '../components/single-card/single-card';
import { MyToolbarComponent } from '../components/my-toolbar/my-toolbar';
import { SingleFoodsItemComponent } from '../components/single-foods-item/single-foods-item';
import { MeunItemComponent } from '../components/meun-item/meun-item';
import { CountdownComponent } from '../components/countdown/countdown';
import { CountInputComponent } from '../components/count-input/count-input';
import { ImgTabs2Component } from "../components/img-tabs2/img-tabs2";




@NgModule({
  declarations: [
    MyApp,
    ClassifyPage, SubnavPage1Page, SubnavPage2Page, MoreBrandPage,
    CarPage,
    HomePage, CityPage, SearchPage, DetailsPage, BrandListPage, AttentionPage, FastbuyPage, GlassesDesignPage, IntegralstorePage, RechargePage, WhitebarPage, DiscountCouponPage, MessagePage, ParticularsPage, ParticularsModalPage, DredgeMoreCityPage, PopoverContentPage,
    MyPage,SettingPage,AccountManagementPage,AccountSecurityPage,AllOrdersPage,CouponPage,MemberCenterPage,PeceiptPage,AccountAssetPage,AccountProcessPage,AccountAreaApplicationPage,AccountCollectGoodsPage,AccountCollectStorePage,AccountHistoryPage,AccountServicePage,AccountHelperPage,AccountInfoPage,InvoiceQualificationPage,InvoiceAskFor2Page,InvoiceAskFor1Page,AboutUsPage,ShippingAddressPage,ChangePhoneNumberPage,ChangePasswordPage,
    TabsPage,
    WelcomePage,
    LoginPage,
    SignupPage, SignupSecondPage, SignupThirdPage,
    MyDirective, ImgTabs,
    SingleCardComponent, MyToolbarComponent, SingleFoodsItemComponent, MeunItemComponent, CountdownComponent, CountInputComponent,ImgTabs2Component,
    DirectiveTestPage,
    ForgotPage, ForgotTwoPage, ForgotThreePage,

  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      tabsHideOnSubPages: true,
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition',
      mode: 'md'
    }, {
        links: [
          { component: HomePage, segment: 'home' },
          { component: CityPage, segment: 'city' }
        ]
      }),
    BrowserModule,
    IonicImageViewerModule,
    IonicImageLoader
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ClassifyPage, SubnavPage1Page, SubnavPage2Page, MoreBrandPage,
    CarPage,
    HomePage, CityPage, SearchPage, DetailsPage, BrandListPage, AttentionPage, FastbuyPage, GlassesDesignPage, IntegralstorePage, RechargePage, WhitebarPage, DiscountCouponPage, MessagePage, ParticularsPage, ParticularsModalPage, DredgeMoreCityPage, PopoverContentPage,
    MyPage,SettingPage,AccountManagementPage,AccountSecurityPage,AllOrdersPage,CouponPage,MemberCenterPage,PeceiptPage,AccountAssetPage,AccountProcessPage,AccountAreaApplicationPage,AccountCollectGoodsPage,AccountCollectStorePage,AccountHistoryPage,AccountServicePage,AccountHelperPage,AccountInfoPage,InvoiceQualificationPage,InvoiceAskFor2Page,InvoiceAskFor1Page,AboutUsPage,ShippingAddressPage,ChangePhoneNumberPage,ChangePasswordPage,
    TabsPage,
    WelcomePage,
    LoginPage,
    SignupPage, SignupSecondPage, SignupThirdPage,
    SingleCardComponent, MyToolbarComponent, SingleFoodsItemComponent, MeunItemComponent, CountdownComponent, CountInputComponent,ImgTabs2Component,
    DirectiveTestPage,
    ForgotPage, ForgotTwoPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, Storage, UserData, Native, HttpService]
})
export class AppModule { }
