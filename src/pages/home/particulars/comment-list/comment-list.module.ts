import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentListPage } from './comment-list';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';
import { OpenMoreDirectiveModule } from '../../../../directives/open-more/open-more.module';
import { PipesModule } from '../../../../pipes/pipes.module';
import { ComponentsModule } from '../../../../components/components.module';
import { Ionic2RatingModule } from 'ionic2-rating';
import { ScrollToTopDirectiveModule } from '../../../../directives/scroll-to-top/scroll-to-top.module';

@NgModule({
   declarations: [
      CommentListPage,
   ],
   imports: [
      IonicPageModule.forChild(CommentListPage),
      ImgLazyLoadDirectiveModule,
      OpenMoreDirectiveModule,
      ComponentsModule,
      PipesModule,
      Ionic2RatingModule,
      ScrollToTopDirectiveModule
   ],
})
export class CommentListPageModule { }
