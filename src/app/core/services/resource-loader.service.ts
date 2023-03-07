import { BehaviorSubject, Observable } from 'rxjs';

export abstract class ResourceLoaderService {
  protected loading$ = new BehaviorSubject<boolean>(true);
  protected error$ = new BehaviorSubject<boolean>(false);

  public isLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  public isError(): Observable<boolean> {
    return this.error$.asObservable();
  }

  protected startFetchingResource(): void {
    this.loading$.next(true);
    this.error$.next(false);
  }

  protected onFetchSuccess(): void {
    this.loading$.next(false);
  }

  protected onFetchError(err: unknown): void {
    console.error(err);
    this.loading$.next(false);
    this.error$.next(true);
  }
}
