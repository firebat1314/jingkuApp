import { Directive, HostListener, Output, EventEmitter } from '@angular/core';
import { Native } from "../../providers/native";

/**
 * Generated class for the GetImageDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[get-image]' // Attribute selector
})
export class GetImageDirective {

  constructor(
    private native: Native
  ) {
    console.log('Hello GetImageDirective Directive');
  }
  @Output('get-image') fileChecked: EventEmitter<number> = new EventEmitter<number>();

  @HostListener('change', ['$event']) onchange(e) {
    if (!e) { return; }
    // console.log(e)
    var reader = new FileReader();
    //获取文件
    var file = e['target']['files'][0];
    var imageType = /^image\//;
    //是否是图片
    if (!imageType.test(file['type'])) {
      this.native.showToast("请选择图片！");
      return;
    }else if(file['size']>(5*1024*1024)){
      this.native.showToast("图片超过限制");
    }
    //读取完成
    reader.onload = (e) => {
      //获取图片dom
      // console.log('reader',e)
      var img_ava = e.target['result'];
      this.fileChecked.emit(img_ava);
    };
    reader.readAsDataURL(file);
  }

}
