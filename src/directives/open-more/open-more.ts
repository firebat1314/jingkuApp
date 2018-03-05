import { Directive, HostListener, Input, HostBinding } from '@angular/core';
import { PopoverController, NavController } from "ionic-angular";
import { menuItem } from "./menu";

/**
 * Generated class for the OpenMoreDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[open-more]', // Attribute selector
  host:{
    '[style.fontSize.px]':'20'
  }
})
export class OpenMoreDirective {

  defaultPopoverPage: string = 'PopoverHomePage';
  defaultMenuItems: menuItem[] = [
    {
      name: '消息',
      icon: '',
      segment: 'PopoverHomePage'
    },
  ]

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
  ) {
    console.log('Hello OpenMoreDirective Directive');
  }
  @Input('open-more') set popoverPage(name: string) {
    this.defaultPopoverPage = name || this.defaultPopoverPage
  }
  /* 
    @Input() set menuItems(items: menuItem[]) {
      this.defaultMenuItems = items || this.defaultMenuItems;
    }; */

  @HostListener('click', ['$event']) onClick(e) {
    console.log(this.defaultPopoverPage)
    let popover = this.popoverCtrl.create(this.defaultPopoverPage, {}, { cssClass: 'popover-menu' });
    popover.present({
      ev: e
    });
    popover.onDidDismiss(data => {
      // this.navCtrl.popToRoot();
      if(data){
        data(this.navCtrl)
      }
    })
  }
}
