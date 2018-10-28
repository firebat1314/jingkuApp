import { Component } from '@angular/core';
import { Events, App, MenuController } from 'ionic-angular';

/**
 * Generated class for the MeunCategoryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
   selector: 'meun-category',
   templateUrl: 'meun-category.html'
})
export class MeunCategoryComponent {
   data: any;

   constructor(
      public events: Events,
      public app: App,
      public meunCtrl: MenuController,
   ) {
      events.subscribe('classifyNew:cateFilter', (res) => {
         this.data = res;
         console.log(res)
      })
   }
   goBrandListPage(item) {
      this.meunCtrl.close().then(()=>{
         this.app.getActiveNav().push('BrandListPage', { listId: item.cat_id })
      })
   }
}
