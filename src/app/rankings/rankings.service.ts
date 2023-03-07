import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from 'app/core/config/app-config.service';
import { PictureDataService } from 'app/core/services/picture-data.service';
import { ResourceLoaderService } from 'app/core/services/resource-loader.service';
import { PictureWithStats } from 'app/models';
import { map, Observable, tap } from 'rxjs';

export interface PictureUrlWithStats extends Omit<PictureWithStats, 'data'> {
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class RankingsService extends ResourceLoaderService {
  private readonly apiUrl: string;
  private readonly unsafeStash: number;

  constructor(
    private appConfigService: AppConfigService,
    private pictureDataService: PictureDataService,
    private http: HttpClient,
  ) {
    super();
    this.apiUrl = this.appConfigService.getConfig().apiUrl;
    this.unsafeStash = this.pictureDataService.createUnsafeStash();
  }

  public getAllRankings(): Observable<PictureUrlWithStats[]> {
    this.startFetchingResource();
    return this.http.get<PictureWithStats[]>(`${this.apiUrl}/pictures`).pipe(
      tap({
        next: () => this.onRankingsFetch(),
        error: (err) => this.onFetchError(err),
      }),
      map((pictures) => this.mapPictureUrls(pictures)),
    );
  }

  private onRankingsFetch(): void {
    this.onFetchSuccess();
    this.pictureDataService.flush(this.unsafeStash);
  }

  private mapPictureUrls(pictures: PictureWithStats[]): PictureUrlWithStats[] {
    return pictures.map((picture) => ({
      uuid: picture.uuid,
      elo: picture.elo,
      stats: picture.stats,
      url: this.pictureDataService.createSafeUrl(this.unsafeStash, picture) ?? '',
    }));
  }
}
