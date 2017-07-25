import { Directive, HostListener, Input } from '@angular/core';
import { NavController, Events } from "ionic-angular";

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

  constructor(
    private navCtrl: NavController,
    private events: Events,
  ) {
    // console.log('Hello AdsClickDirective Directive');
  }
  @Input('ads-click') link_type: any;

  @HostListener('click') onClick() {
    console.log(this.link_type);
    if (this.link_type.type_name == 'category') {
      this.goClassPage('classify');
    } else if (this.link_type.type_name == 'goods') {
      this.navCtrl.push('ParticularsPage', {
        goodsId: this.link_type.type_value
      })
    } else if (this.link_type.type_name == "brand") {
      this.goClassPage('brand');
    } else if (this.link_type.type_name == "search") {
      this.navCtrl.push('BrandListPage',{myHomeSearch:this.link_type.type_value})
    }
  }
  goClassPage(value) {
    this.navCtrl.popToRoot();
    this.navCtrl.parent.select(1);
    this.events.publish('classify:selectSegment', value);
  }
}
