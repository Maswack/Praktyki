import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../play-chess/play-chess.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../fun-room/fun-room.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../chess-lessons/chess-lessons.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../chess-ranking/chess-ranking.module').then(m => m.Tab4PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
