import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';

/*
  Generated class for the Countdown component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'countdown',
  template: '<span class="time">{{day}}</span>天<span class="time">{{hour}}</span>时<span class="time">{{minute}}</span>分<span class="time">{{second}}</span>'
})

export class CountdownComponent implements AfterViewInit, OnDestroy {
  // 父组件传递截止日期
  @Input() endDate: number;
  // day差
  private day: number;
  // 小时差
  private hour: number;
  // 分钟差
  private minute: number;
  // 秒数差
  private second: number;
  
  private set diff(val) {
    let date = new Date(val)
    this.day = date.getDate();
    this.hour = date.getHours();
    this.minute = date.getMinutes();
    this.second = date.getSeconds();
  }

  // 定时器
  private timer;
  constructor() {
    console.log('Hello Countdown Component');
  }
  // 每一秒更新时间差
  ngAfterViewInit() {
    this.timer = setInterval(() => {
      this.endDate -= 1000;
      this.diff = this.endDate;
    }, 1000);
  }

  // 销毁组件时清除定时器
  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}