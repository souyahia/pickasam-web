import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageSwitchComponent } from 'app/core/components/language-switch/language-switch.component';
import { NavbarComponent } from 'app/core/components/navbar/navbar.component';
import { SharedModule } from 'app/shared/shared.module';
import { InfoModalComponent } from './components/info-modal/info-modal.component';

@NgModule({
  declarations: [NavbarComponent, LanguageSwitchComponent, InfoModalComponent],
  imports: [SharedModule, RouterModule],
  exports: [NavbarComponent],
})
export class CoreModule {}
