import { Injectable } from '@angular/core';
import { Gender } from 'app/models';
import { LocalStorageService } from 'ngx-webstorage';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenderService {
  private readonly GENDER_STORAGE_KEY = 'gender';
  private gender$ = new BehaviorSubject<Gender>(Gender.UNKNOWN);

  constructor(private storage: LocalStorageService) {
    const localStorageGender = this.storage.retrieve(this.GENDER_STORAGE_KEY);
    if (Object.values(Gender).includes(localStorageGender)) {
      this.gender$.next(localStorageGender);
    }
  }

  public getGender(): Observable<Gender> {
    return this.gender$.asObservable();
  }

  public setGender(gender: Gender): void {
    this.gender$.next(gender);
    this.storage.store(this.GENDER_STORAGE_KEY, gender);
  }
}
