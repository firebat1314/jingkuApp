import { Component , Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'img-tabs',
  templateUrl:'img-tabs.html'
})
export class ImgTabs {
  @Input("slides") slides: string[] = [];  
  @Input("pageNumber") pageNumber: number = 5;  
  @Output("slideClick") slideClick = new EventEmitter<number>();  
  constructor() {
    console.log('Hello ImgTabs Component');
  }

  selectedIndex: number = 0;  

  ngOnInit() {  
    
  }  
  
  onClick(index) {  
    this.selectedIndex = index;  
    this.slideClick.emit(index);  
  }  
}
