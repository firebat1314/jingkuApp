import { Component, Input, EventEmitter, Output } from '@angular/core';

/*
  Generated class for the ImgTabs2 component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'img-tabs2',
  templateUrl: 'img-tabs2.html'
})
export class ImgTabs2Component {
  selectedIndex: number = 0;

  @Input("slides") slides: string[] = [];
  @Input("pageNumber") pageNumber: number = 5;
  @Output("slideClick") slideClick = new EventEmitter<number>();
  constructor() {
    console.log('Hello ImgTabs2 Component');
  }

  onClick(index) {
    this.selectedIndex = index;
    this.slideClick.emit(index);
  }
}
