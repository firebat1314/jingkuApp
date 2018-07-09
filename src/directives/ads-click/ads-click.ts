import { Directive, HostListener, Input } from '@angular/core';
import { NavController, Events } from "ionic-angular";
import { HttpService } from '../../providers/http-service';

/**
 * Generated class for the AdsClickDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
   selector: '[ads-click]' // Attribute selector
})
export class AdsClickDirective {
   link_type: any;

   constructor(
      private navCtrl: NavController,
      private events: Events,
      private httpServ: HttpService,
   ) {
      // console.log('Hello AdsClickDirective Directive');
   }
   @Input('ads-click') data: any;

   @HostListener('click') onClick() {
      this.link_type = this.data.link_type || {};
      console.log(this.link_type);
      this.httpServ.click_census({ type: 'ad', url: '/' + location.href, id: this.data.ad_id });//用户点击统计
      
      if (this.link_type.type_name == 'category') {
         this.goBrandListPage({ listId: this.link_type.type_value });
      } else if (this.link_type.type_name == 'goods') {
         this.goParticularsPage({ goodsId: this.link_type.type_value });
      } else if (this.link_type.type_name == "brand") {
         this.goBrandListPage({ brandId: this.link_type.type_value });
      } else if (this.link_type.type_name == "search") {
         this.goBrandListPage({ keyword: this.link_type.type_value });
      } else if (this.link_type.type_name == "page") {
         eval(this.link_type.type_value);
      }
   }
   goClassPage(value) {
      this.navCtrl.popToRoot();
      this.navCtrl.parent.select(1);
      this.events.publish('classify:selectSegment', value);
   }
   goBrandListPage(data) {
      this.navCtrl.push('BrandListPage', data)
   }
   goParticularsPage(data) {
      this.navCtrl.push('ParticularsPage', data)
   }
}
