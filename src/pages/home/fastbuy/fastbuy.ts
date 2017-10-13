import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Content, IonicPage, FabButton } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";

/*
  Generated class for the Fastbuy page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-fastbuy',
  templateUrl: 'fastbuy.html'
})
export class FastbuyPage {

  category: any;
  data: any;
  selected = 0;

  @ViewChild(Content) content: Content;
  @ViewChild(FabButton) fabButton: FabButton;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public elementRef: ElementRef
  ) {
    this.httpService.getCategoryPromote().then((data)=>{
      this.category = data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FastbuyPage');
  }
  ngAfterViewInit() {
    /* 回到顶部按钮 */
    this.fabButton.setElementClass('fab-button-out', true);
    this.content.ionScroll.subscribe((d) => {
      this.fabButton.setElementClass("fab-button-in", d.scrollTop >= d.contentHeight);
    });
  }
  ngOnInit(){
    this.getData(this.selected);
  }
  getData(id) {
    /* 	var lileng = $('.top_menu li').length;
        var uwi = lileng * 100 + 'px';
        console.log()
        $('.top_menu').width(uwi)
        console.log(lileng);
        
        $('.top_menu>li').click(function () {
          $(this).addClass('meon').siblings().removeClass('meon');
        })*/
    // this.elementRef.nativeElement.getElementsBy
    this.selected = id
    this.httpService.presell({ type: 'is_promote', cat_id: id }).then((res) => {
      if (res.status == 1) { this.data = res; }
    })
  }
  goParticularsPage(id) {
    this.navCtrl.push('ParticularsPage', { goodsId: id })
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
}
