import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Picture } from 'app/models';

@Injectable({
  providedIn: 'root',
})
export class PictureDataService {
  private readonly unsafeStashes: string[][] = [];

  constructor(private sanitizer: DomSanitizer) {}

  public createUnsafeStash(): number {
    this.unsafeStashes.push([]);
    return this.unsafeStashes.length - 1;
  }

  public createSafeUrl(stash: number, picture: Picture): string | null {
    const blob = new Blob([Buffer.from(picture.data.data)], { type: 'image/jpeg' });
    const unsafeUrl = URL.createObjectURL(blob);
    this.unsafeStashes[stash].push(unsafeUrl);
    return this.sanitizer.sanitize(SecurityContext.STYLE, `url(${unsafeUrl})`);
  }

  public flush(stash: number): void {
    this.unsafeStashes[stash].forEach((unsafeUrl) => {
      URL.revokeObjectURL(unsafeUrl);
    });
    this.unsafeStashes[stash] = [];
  }
}
