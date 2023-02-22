import { NgModule } from '@angular/core';
import { GenderComponent } from 'app/gender/gender.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [GenderComponent],
  imports: [SharedModule],
  exports: [GenderComponent],
})
export class GenderModule {}
