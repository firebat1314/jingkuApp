import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";

/*
  Generated class for the MemberCenter page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-member-center',
  templateUrl: 'member-center.html'
})
export class MemberCenterPage {
  rankName: any = 0;
  nextRankName: any = 0;
  nextRank: any = 0;

  data: any;
  userInfo: any;

  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberCenterPage');
    this.httpService.userInfo().then((res) => {
      console.log(res)
      if (res.status == 1) {
        this.userInfo = res;
      }
    })
    this.httpService.userRank().then((res) => {
      console.log(res);
      if (res.status == 1) {
        this.data = res;
        for(let i = 0;i < res.data.length;i++){
          if(Number(res.data[i].min_points)<=Number(res.rank_points)&&Number(res.data[i].max_points)>Number(res.rank_points)){
            this.rankName = res.data[i].rank_name;
            this.nextRank = res.data[i].max_points-res.rank_points;
            this.nextRankName = res.data[i+1].rank_name
          }
        }
      }
    })
  }

}
