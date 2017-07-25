export class ChecklistModel {

   checklist: any;
   checklistObserver: any;

   constructor(public title: string, public items: any[]) {
      this.items = items;
   }

   addItem(item): void {

      this.items.push({
         title: item,
         checked: false
      });

   }

   removeItem(item): void {

      let index = this.items.indexOf(item);

      if (index > -1) {
         this.items.splice(index, 1);
      }
   }

   toggleItem(item): void {
      let index = this.items.indexOf(item.cat_id);
      if (index > -1) {
         this.items.splice(index, 1);
         item.selected = 0;
      } else {
         this.items.push(item.cat_id);
         item.selected = 1;
      }
   }

}
export class RadiolistModel {

   constructor(public item: any) {
      this.item = item;
   }
   toggleItem(item, items): void {
      if (item.selected == 1) {
         item.selected = 0;
         this.item.min_price =  null;
         this.item.max_price = null;
      } else {
         this.item.min_price = Number(item.min_price);
         this.item.max_price = Number(item.max_price);
         for (let i = 0; i < items.length; i++) {
            items[i].selected = 0;
         }
         item.selected = 1;
      }
   }
   toggleItem2(item, items): void {
      if (item.selected == 1) {
         item.selected = 0;
         this.item.cat_id = '';
      } else {
         for (let i = 0; i < items.length; i++) {
            items[i].selected = 0;
         }
         item.selected = 1;
         this.item.cat_id = item.cat_id;
      }
   }
   toggleItem3(item, items): void {
      if (item.selected == 1) {
         item.selected = 0;
         this.item.brand_id = '';
      } else {
         for (let i = 0; i < items.length; i++) {
            items[i].selected = 0;
         }
         item.selected = 1;
         this.item.brand_id = item.brand_id;
      }
   }
   toggleItem4(item, items): void {
      if (item.selected == 1) {
         item.selected = 0;
         this.item = null;
      } else if(item.selected == 0){
         item.selected = 1;
         this.item = item.attr_id;
      }
   }
}