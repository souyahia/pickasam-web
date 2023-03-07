import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, Injectable, Provider } from '@angular/core';
import { AppConfig } from 'app/core/config/app-config';
import { firstValueFrom } from 'rxjs';

export enum ConfigEnv {
  DEVELOPMENT,
  PRODUCTION,
}



@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private config: AppConfig | null = null;

  constructor(private http: HttpClient) {}

  public use(env: ConfigEnv): Promise<void> {
    const configUrl = this.getUrl(env);
    return firstValueFrom(this.http.get<AppConfig>(configUrl)).then((config) => {
      this.config = config;
    });
  }

  public getConfig(): AppConfig {
    if (!this.config) {
      throw new Error('Application config not yet loaded !');
    }
    return this.config;
  }

  private getUrl(env: ConfigEnv): string {
    switch (env) {
      case ConfigEnv.DEVELOPMENT:
        return '/content/configs/development.json';
      case ConfigEnv.PRODUCTION:
        return '/content/configs/production.json';
      default:
        return '';
    }
  }
}

export function getAppConfigServiceProvider(env: ConfigEnv): Provider {
  return {
    provide: APP_INITIALIZER,
    multi: true,
    deps: [AppConfigService],
    useFactory: (service: AppConfigService) => {
      return () => service.use(env);
    },
  };
}
