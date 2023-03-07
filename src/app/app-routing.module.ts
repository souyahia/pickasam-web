import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./match/match.module').then((m) => m.MatchModule),
  },
  {
    path: 'rankings',
    loadChildren: () => import('./rankings/rankings.module').then((m) => m.RankingsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
