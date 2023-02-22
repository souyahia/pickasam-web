import { HttpClient } from '@angular/common/http';
import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GenderService } from 'app/gender/gender.service';
import { Gender, Match, Picture, Winner } from 'app/models';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';

const DELAY = 400;

interface UpdateMatchResultRequestBody {
  winner: Winner;
  gender: Gender;
}

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private readonly SERVER_URL = 'http://localhost:3000';

  private gender = Gender.UNKNOWN;
  private match: Match | null = null;
  private pictureUnsafeUrls: string[] = [];
  private picture1Url$ = new BehaviorSubject<string | null>(null);
  private picture2Url$ = new BehaviorSubject<string | null>(null);
  private loading$ = new BehaviorSubject<boolean>(true);
  private error$ = new BehaviorSubject<boolean>(false);

  constructor(
    private genderService: GenderService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) {
    this.getNewMatch();
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

    const result = this.http
      .patch(`${this.SERVER_URL}/match/${this.match.uuid}`, payload)
      .pipe(delay(DELAY));
    this.getNewMatch();
    return result;
  }

  public getPicture1Url(): Observable<string | null> {
    return this.picture1Url$.asObservable();
  }

  public getPicture2Url(): Observable<string | null> {
    return this.picture2Url$.asObservable();
  }

  public isLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  public isError(): Observable<boolean> {
    return this.error$.asObservable();
  }

  private getNewMatch(): void {
    this.loading$.next(true);
    this.error$.next(false);

    this.http
      .get<Match>(`${this.SERVER_URL}/match`)
      .pipe(delay(DELAY))
      .subscribe({
        next: (match) => this.onNewMatch(match),
        error: (err) => this.onMatchFetchError(err),
      });
  }

  private onNewMatch(match: Match): void {
    this.loading$.next(false);
    this.match = match;
    this.revokeUnsafeUrls();
    this.picture1Url$.next(this.createSafeUrl(match.picture1));
    this.picture2Url$.next(this.createSafeUrl(match.picture2));
  }

  private createSafeUrl(picture: Picture): string | null {
    const blob = new Blob([Buffer.from(picture.data.data)], { type: 'image/jpeg' });
    const unsafeUrl = URL.createObjectURL(blob);
    this.pictureUnsafeUrls.push(unsafeUrl);
    return this.sanitizer.sanitize(SecurityContext.STYLE, `url(${unsafeUrl})`);
  }

  private onMatchFetchError(err: unknown): void {
    console.error(err);
    this.match = null;
    this.loading$.next(false);
    this.error$.next(true);
    this.picture1Url$.next(null);
    this.picture2Url$.next(null);
  }

  private onNewGender(gender: Gender): void {
    this.gender = gender;
  }

  private revokeUnsafeUrls(): void {
    this.pictureUnsafeUrls.forEach((unsafeUrl) => {
      URL.revokeObjectURL(unsafeUrl);
    });
    this.pictureUnsafeUrls = [];
  }
}
