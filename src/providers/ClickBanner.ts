import { ParticularsPage } from "../pages/home/particulars/particulars";
import { NavController, Events } from "ionic-angular";

export class ClickBanner {

   constructor(
      public navCtrl: NavController,
      public events: Events
   ) { }

   clickBanner(item) {
      console.log(item);
      if (item.link_type.type_name == 'category') {
         this.goClassPage('classify');
      } else if (item.link_type.type_name == 'goods') {
         this.navCtrl.push(ParticularsPage, {
            goodsId: item.link_type.type_value
         })
      } else if (item.link_type.type_name == "brand") {
         this.goClassPage('brand');
      }
   }
   goClassPage(value) {
      this.navCtrl.popToRoot();
      this.navCtrl.parent.select(1);
      this.events.publish('classify:selectSegment', value);
   }
}