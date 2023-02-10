import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { HomeComponent } from './home.component';
import { HOME_ROUTE } from './home.route';

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, RouterModule.forChild(HOME_ROUTE)],
})
export class HomeModule {}
