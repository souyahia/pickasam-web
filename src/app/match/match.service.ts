import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from 'app/core/config/app-config.service';
import { PictureDataService } from 'app/core/services/picture-data.service';
import { ResourceLoaderService } from 'app/core/services/resource-loader.service';
import { GenderService } from 'app/gender/gender.service';
import { Gender, Match, Picture, Winner } from 'app/models';
import { BehaviorSubject, Observable, of } from 'rxjs';

interface UpdateMatchResultRequestBody {
  winner: Winner;
  gender: Gender;
}

@Injectable({
  providedIn: 'root',
})
export class MatchService extends ResourceLoaderService {
  private readonly apiUrl: string;
  private readonly unsafeStash: number;
  private gender = Gender.UNKNOWN;
  private match: Match | null = null;
  private picture1Url$ = new BehaviorSubject<string | null>(null);
  private picture2Url$ = new BehaviorSubject<string | null>(null);

  constructor(
    private appConfigService: AppConfigService,
    private genderService: GenderService,
    private pictureDataService: PictureDataService,
    private http: HttpClient,
  ) {
    super();
    this.apiUrl = this.appConfigService.getConfig().apiUrl;
    this.unsafeStash = this.pictureDataService.createUnsafeStash();
    this.createMatch();
    this.genderService.getGender().subscribe((gender) => this.onNewGender(gender));
  }

  public choosePicture(winner: Winner): Observable<unknown> {
    if (!this.match) {
      return of(void 0);
    }
    const payload: UpdateMatchResultRequestBody = {
      winner,
      gender: this.gender,
    };

    const result = this.http.patch(`${this.apiUrl}/match/${this.match.uuid}`, payload);
    this.createMatch();
    return result;
  }

  public getPicture1Url(): Observable<string | null> {
    return this.picture1Url$.asObservable();
  }

  public getPicture2Url(): Observable<string | null> {
    return this.picture2Url$.asObservable();
  }

  private createMatch(): void {
    this.startFetchingResource();
    this.http.post<Match>(`${this.apiUrl}/match`, { gender: this.gender }).subscribe({
      next: (match) => this.onNewMatch(match),
      error: (err) => this.onMatchFetchError(err),
    });
  }

  private onNewMatch(match: Match): void {
    this.onFetchSuccess();
    this.match = match;
    this.pictureDataService.flush(this.unsafeStash);
    this.picture1Url$.next(this.createSafeUrl(match.picture1));
    this.picture2Url$.next(this.createSafeUrl(match.picture2));
  }

  private createSafeUrl(picture: Picture): string | null {
    return this.pictureDataService.createSafeUrl(this.unsafeStash, picture);
  }

  private onMatchFetchError(err: unknown): void {
    this.onFetchError(err);
    this.match = null;
    this.picture1Url$.next(null);
    this.picture2Url$.next(null);
  }

  private onNewGender(gender: Gender): void {
    this.gender = gender;
  }
}
