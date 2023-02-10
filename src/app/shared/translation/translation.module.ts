import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  TranslateModule,
  TranslateService,
  TranslateLoader,
  MissingTranslationHandler,
} from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';
import {
  missingTranslationHandler,
  translatePartialLoader,
} from 'app/core/config/translation.config';

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translatePartialLoader,
        deps: [HttpClient],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useFactory: missingTranslationHandler,
      },
    }),
  ],
})
export class TranslationModule {
  constructor(
    private translateService: TranslateService,
    sessionStorageService: SessionStorageService,
  ) {
    translateService.setDefaultLang('en');
    const langKey = sessionStorageService.retrieve('locale') ?? 'en';
    translateService.use(langKey);
  }
}
