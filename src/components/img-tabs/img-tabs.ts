import { Directive , Input, Output, EventEmitter} from '@angular/core';

/*
  Generated class for the ImgTabs directive.

  See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Directive({
  selector: '[img-tabs]' // Attribute selector
})
export class ImgTabs {
  @Input("slides") slides: string[] = [];  
  @Input("pageNumber") pageNumber: number = 5;  
  @Output("slideClick") slideClick = new EventEmitter<number>();  
  constructor() {
    console.log('Hello ImgTabs Directive');
  }

  
  mySlideOptions;  
  selectedIndex: number = 0;  

  ngOnInit() {  
    this.mySlideOptions = {  
      loop: false,  
      autoplay: false,  
      initialSlide: 0,  
      pager: false,  
      slidesPerView: this.pageNumber,  
      paginationHide: true,  
      paginationClickable: true  
    };  
  }  
  
  onClick(index) {  
    this.selectedIndex = index;  
    this.slideClick.emit(index);  
  }  
}
