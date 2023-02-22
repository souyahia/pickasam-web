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

const DEFAULT_LANG = 'fr';
const ACCEPTED_LANGUAGES = ['fr', 'en'];

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
    translateService.setDefaultLang(DEFAULT_LANG);
    const lang =
      this.getNavigatorLanguage() ?? sessionStorageService.retrieve('locale') ?? DEFAULT_LANG;
    translateService.use(lang);
  }

  getNavigatorLanguage(): string | null {
    let lang = navigator.language;
    if (!lang) {
      return null;
    }
    if (lang.includes('-')) {
      lang = lang.split('-')[0];
    }
    return ACCEPTED_LANGUAGES.includes(lang) ? lang : null;
  }
}
