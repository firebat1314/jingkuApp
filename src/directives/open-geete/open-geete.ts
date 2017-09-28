import { Directive, ElementRef } from '@angular/core';

/**
 * Generated class for the OpenGeeteDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */

declare let initGeetest: any;

@Directive({
  selector: '[open-geete]' // Attribute selector
})
export class OpenGeeteDirective {

  constructor(
    public ele: ElementRef
  ) {
    console.log('Hello OpenGeeteDirective Directive');
  }

  ngAfterViewInit() {
    var _this = this
    console.log(_this.ele.nativeElement);
    initGeetest({
      // 省略配置参数
    }, function (captchaObj) {
      captchaObj.appendTo(_this.ele.nativeElement);
      // 省略其他方法的调用
    });
  }

}
