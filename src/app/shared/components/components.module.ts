import { NgModule } from '@angular/core';
import { DirectivesModule } from 'app/shared/directives/directives.module';
import { SharedLibsModule } from 'app/shared/shared-libs.module';

@NgModule({
  imports: [SharedLibsModule, DirectivesModule],
  declarations: [],
  exports: [],
})
export class ComponentsModule {}
