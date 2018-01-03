import { Directive, HostListener, Output, EventEmitter, Input } from '@angular/core';
import { Native } from "../../providers/native";
import { ActionSheetController } from 'ionic-angular';

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
    private native: Native,
    public actionSheetCtrl: ActionSheetController,
  ) {
    console.log('Hello GetImageDirective Directive');
  }
  @Output('get-image') fileChecked: EventEmitter<number> = new EventEmitter<number>();
  @Input() quality: number;

  @HostListener('change', ['$event']) onchange(e) {
    if (!e) { return; }
    /* if(!this.native.isMobile()){
      e.stopProPagation()
      let actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: '拍照上传',
            role: 'destructive',
            handler: () => {
              this.native.getPictureByCamera({}).then((data) => {
                this.fileChecked.emit(data);
              })
            }
          },
          {
            text: '本地上传',
            handler: () => {
              this.native.getPictureByPhotoLibrary({}).then((data) => {
                this.fileChecked.emit(data);
              })
            }
          },
          {
            text: '取消',
            role: 'cancel',
            handler: () => {}
          }
        ]
      });
      actionSheet.present();
      
    }else{

    } */
    let file = e.target.files[0];//获取文件
    let imageType = /^image\//;
    if (!imageType.test(file.type)) {//判断图片
      this.native.showToast("请选择图片！");
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {//读取完成
      console.log(reader,event)
      if (file.size > (6 * 1024 * 1024)) {
        this.native.showToast("图片超过限制");
      } else {
        console.log('压缩品质:', this.quality);
        this.dealImage(event.target['result'], {
          quality: this.quality
        }, (base) => {
          // console.log("压缩后：" + base.length / 1024 + " ");　
          this.fileChecked.emit(base);
        })
      }
    };
    console.log(reader,reader.onload,reader.onloadend,reader.readAsDataURL)
  }
  dealImage(path: string, obj: { width?: number, height?: number, quality?: number }, callback) {
    let img = new Image();
    img.src = path;
    img.onload = function () {
      // 默认按比例压缩
      let w = img.width,
        h = img.height,
        scale = w / h;
      w = obj.width || w;
      h = obj.height || (w / scale);
      let quality = 0.7;  // 默认图片质量为0.7
      //生成canvas
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      // 创建属性节点
      let anw = document.createAttribute("width");
      anw.nodeValue = String(w);
      let anh = document.createAttribute("height");
      anh.nodeValue = String(h);
      canvas.setAttributeNode(anw);
      canvas.setAttributeNode(anh);
      ctx.drawImage(img, 0, 0, w, h);
      // 图像质量
      if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
        quality = obj.quality;
      }
      // quality值越小，所绘制出的图像越模糊
      let base64 = canvas.toDataURL('image/jpeg', quality);
      // 回调函数返回base64的值
      callback(base64);
    }
  }

}
