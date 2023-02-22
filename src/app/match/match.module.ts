import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GenderModule } from 'app/gender/gender.module';
import { SharedModule } from 'app/shared/shared.module';
import { MatchComponent } from './match.component';
import { MATCH_ROUTE } from './match.route';

@NgModule({
  declarations: [MatchComponent],
  imports: [SharedModule, RouterModule.forChild(MATCH_ROUTE), GenderModule],
})
export class MatchModule {}
