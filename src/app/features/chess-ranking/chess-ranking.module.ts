import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './chess-ranking-routing.module';

import { Tab4Page } from './chess-ranking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule,
    RouterModule.forChild([{ path: '', component: Tab4Page }]),
    HttpClientModule
  ],
  declarations: [Tab4Page]
})
export class Tab4PageModule {}
