import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OnDestroyComponent } from 'app/core/components/on-destroy.component';
import { Observable, takeUntil } from 'rxjs';

interface AvailableLanguage {
  key: string;
  flag: string;
  name: string;
}

@Component({
  selector: 'pks-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss'],
})
export class LanguageSwitchComponent extends OnDestroyComponent implements OnInit {
  public readonly availableLanguages: AvailableLanguage[] = [
    { key: 'fr', flag: '../../content/images/flags/fr.png', name: 'Français' },
    { key: 'en', flag: '../../content/images/flags/en.png', name: 'English' },
  ];
  private selectedLanguage = '';

  constructor(private translateService: TranslateService) {
    super();
  }

  ngOnInit(): void {
    this.translateService.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((event) => (this.selectedLanguage = event.lang));
  }

  public isLanguageSelected(lang: AvailableLanguage): boolean {
    return this.selectedLanguage === lang.key;
  }

  public getSelectedLanguage(): AvailableLanguage {
    return (
      this.availableLanguages.find((lang) => this.isLanguageSelected(lang)) ??
      this.availableLanguages[0]
    );
  }

  public selectLanguage(lang: AvailableLanguage): Observable<any> {
    return this.translateService.use(lang.key);
  }
}
