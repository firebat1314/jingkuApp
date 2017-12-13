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
    console.log(file)
    var imageType = /^image\//;
    //是否是图片
    if (!imageType.test(file['type'])) {
      this.native.showToast("请选择图片！");
      return;
    }
    //读取完成
    reader.onload = (e) => {
      //获取图片dom
      // console.log('reader',e)
      this.dealImage(e.target['result'],{
        quality:0.4
      },(base)=>{
        // console.log("压缩后：" + base.length / 1024 + " ");　
        this.fileChecked.emit(base);
      })
      /* if(file['size']>(2*1024*1024)){
          this.native.showToast("图片超过限制");
      }else{
        this.fileChecked.emit(e.target['result']);
      } */
    };
    reader.readAsDataURL(file);
  }
  dealImage(path, obj, callback){
    var img = new Image();
    img.src = path;
    img.onload = function(){
     var that = this;
     // 默认按比例压缩
     var w = that['width'],
      h = that['height'],
      scale = w / h;
      w = obj.width || w;
      h = obj.height || (w / scale);
     var quality = 0.7;  // 默认图片质量为0.7
     //生成canvas
     var canvas = document.createElement('canvas');
     var ctx = canvas.getContext('2d');
     // 创建属性节点
     var anw = document.createAttribute("width");
     anw.nodeValue = w;
     var anh = document.createAttribute("height");
     anh.nodeValue = h;
     canvas.setAttributeNode(anw);
     canvas.setAttributeNode(anh); 
     ctx.drawImage(img, 0, 0, w, h);
     // 图像质量
     if(obj.quality && obj.quality <= 1 && obj.quality > 0){
      quality = obj.quality;
     }
     // quality值越小，所绘制出的图像越模糊
     var base64 = canvas.toDataURL('image/jpeg', quality );
     // 回调函数返回base64的值
     callback(base64);
    }
   }

}
