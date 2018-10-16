import { Component, Input, ViewChildren, QueryList, ElementRef } from '@angular/core';

/**
 * Generated class for the MyCanvasComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'my-canvas',
  templateUrl: 'my-canvas.html'
})
export class MyCanvasComponent {

  @Input() baifen: any;
  @ViewChildren('myCanvas') myCanvas: QueryList<ElementRef>;

  constructor() {
    console.log('Hello MyCanvasComponent Component');
  }
  
  ngAfterViewInit() {
    this.myCanvas.changes.subscribe(data => data._results.forEach(
      (e, i) => {
        let ctx = e.nativeElement.getContext("2d");
        if (this.baifen) {
          this.timer(ctx, 0, Number(this.baifen), 50);
        }
      }));
    this.myCanvas.notifyOnChanges();
  }
  circle(cxt, percent) {
    var p = (percent * 100).toFixed(0);
    //生成圆形（底圆）
    cxt.fillStyle = "rgb(191,209,255)";
    cxt.beginPath();
    cxt.moveTo(30, 30);
    cxt.arc(30, 30, 30, 0, Math.PI * 2, false);
    cxt.closePath();
    cxt.fill();
    //生成扇形
    cxt.fillStyle = "#799fff";
    cxt.beginPath();
    cxt.moveTo(30, 30);
    if (percent == 1) {
      cxt.arc(30, 30, 30, 0, Math.PI * 2, false);
    } else if (percent == 0) {
      cxt.arc(30, 30, 30, 0, 0, true);
    } else {
      cxt.arc(30, 30, 30, Math.PI, Math.PI + Math.PI * 2 * percent, false);
    }
    cxt.closePath();
    cxt.fill();
    //生成圆形（上层园）
    cxt.fillStyle = "#ffffff";
    cxt.beginPath();
    cxt.moveTo(30, 30);
    cxt.arc(30, 30, 25, 0, Math.PI * 2, false);
    cxt.closePath();
    cxt.fill();
    //生成中间百分比文字
    cxt.font = "13px arial";
    cxt.fillStyle = "#799fff";
    cxt.textAlign = "center";
    cxt.fillText('已抢', 30, 27);
    cxt.fillText(p + "%", 30, 44);
  }
  timer(id, start, end, interval) {
    setTimeout(() => {
      this.circle(id, start / 100);
      start++;
      if (start < end + 1) {
        this.timer(id, start, end, interval);
      }
    }, interval);
  }
}
