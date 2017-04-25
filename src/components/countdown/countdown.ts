import { Component, Input, OnDestroy, AfterViewInit } from '@angular/core';

/*
  Generated class for the Countdown component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'countdown',
  template: '<span>{{day}}</span>天<span>{{hour}}</span>时<span>{{minute}}</span>分<span>{{second}}</span>'
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
    this.day = date.getDate() || 0;
    this.hour = date.getHours() || 0;
    this.minute = date.getMinutes() || 0;
    this.second = date.getSeconds() || 0;
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