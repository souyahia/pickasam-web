import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslationModule } from 'app/shared/translation/translation.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot({ prefix: 'my-app', separator: '-', caseSensitive: true }),
    CoreModule,
    TranslationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
