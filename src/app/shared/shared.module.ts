import { NgModule } from '@angular/core';
import { SharedLibsModule } from './shared-libs.module';
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [],
  imports: [SharedLibsModule, ComponentsModule, DirectivesModule, PipesModule],
  exports: [SharedLibsModule, ComponentsModule, DirectivesModule, PipesModule],
})
export class SharedModule {}
