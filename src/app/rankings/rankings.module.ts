import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RankingsComponent } from 'app/rankings/rankings.component';
import { RANKINGS_ROUTE } from 'app/rankings/rankings.route';
import { SharedModule } from 'app/shared/shared.module';
import { GenderSwitchComponent } from './gender-switch/gender-switch.component';

@NgModule({
  declarations: [RankingsComponent, GenderSwitchComponent],
  imports: [SharedModule, RouterModule.forChild(RANKINGS_ROUTE)],
  exports: [RankingsComponent],
})
export class RankingsModule {}
