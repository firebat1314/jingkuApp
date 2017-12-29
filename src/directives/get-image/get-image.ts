import { Directive, HostListener, Output, EventEmitter, Input } from '@angular/core';
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
  @Input() quality: number;

  @HostListener('change', ['$event']) onchange(e) {
    if (!e) { return; }
    // console.log(e)
    var reader = new FileReader();
    //获取文件
    var file: File = e.target.files[0];
    // console.log(file)
    var imageType = /^image\//;
    //是否是图片
    if (!imageType.test(file.type)) {
      this.native.showToast("请选择图片！");
      return;
    }
    //读取完成
    reader.onload = (e) => {
      // console.log('reader',e)
      if (file.size > (6 * 1024 * 1024)) {
        this.native.showToast("图片超过限制");
      } else {
        console.log('压缩品质:', this.quality);
        this.dealImage(e.target['result'], {
          quality: this.quality
        }, (base) => {
          // console.log("压缩后：" + base.length / 1024 + " ");　
          this.fileChecked.emit(base);
        })
      }
    };
    reader.readAsDataURL(file);
  }
  dealImage(path: string, obj: { width?: number, height?: number, quality?: number }, callback) {
    var img = new Image();
    img.src = path;
    img.onload = function () {
      // 默认按比例压缩
      var w = img.width,
        h = img.height,
        scale = w / h;
      w = obj.width || w;
      h = obj.height || (w / scale);
      var quality = 0.7;  // 默认图片质量为0.7
      //生成canvas
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      // 创建属性节点
      var anw = document.createAttribute("width");
      anw.nodeValue = String(w);
      var anh = document.createAttribute("height");
      anh.nodeValue = String(h);
      canvas.setAttributeNode(anw);
      canvas.setAttributeNode(anh);
      ctx.drawImage(img, 0, 0, w, h);
      // 图像质量
      if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
        quality = obj.quality;
      }
      // quality值越小，所绘制出的图像越模糊
      var base64 = canvas.toDataURL('image/jpeg', quality);
      // 回调函数返回base64的值
      callback(base64);
    }
  }

}
