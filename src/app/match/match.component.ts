import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnDestroyComponent } from 'app/core/components/on-destroy.component';
import { ResourceLoaderComponent } from 'app/core/components/resource-loader.component';
import { GenderComponent } from 'app/gender/gender.component';
import { GenderService } from 'app/gender/gender.service';
import {
  popOutAnimation,
  PopOutState,
  SELECT_ANIMATION_DURATION_MS,
  selectAnimation,
  SelectState,
} from 'app/match/animations';
import { MatchService } from 'app/match/match.service';
import { Gender, Winner } from 'app/models';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'pks-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
  animations: [popOutAnimation, selectAnimation],
})
export class MatchComponent extends ResourceLoaderComponent implements OnInit {
  public picture1CssUrl = '';
  public picture2CssUrl = '';
  public isInSelectAnimation = false;

  private selectedPicture: string | null = null;

  constructor(
    private matchService: MatchService,
    private genderService: GenderService,
    private modalService: NgbModal,
  ) {
    super(matchService);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.genderService
      .getGender()
      .pipe(takeUntil(this.destroy$))
      .subscribe((gender) => this.onNewGender(gender));
    this.matchService
      .getPicture1Url()
      .pipe(takeUntil(this.destroy$))
      .subscribe((url) => this.onNewPicture1Url(url));
    this.matchService
      .getPicture2Url()
      .pipe(takeUntil(this.destroy$))
      .subscribe((url) => this.onNewPicture2Url(url));
  }

  public getPopOutState(): PopOutState {
    return this.isError || (this.isLoading && !this.isInSelectAnimation)
      ? PopOutState.HIDDEN
      : PopOutState.VISIBLE;
  }

  public getSelectState(picture: 1 | 2): SelectState {
    if (this.selectedPicture === null) {
      return SelectState.DEFAULT;
    }
    const cssUrl = picture === 1 ? this.picture1CssUrl : this.picture2CssUrl;
    return cssUrl === this.selectedPicture ? SelectState.SELECTED : SelectState.NOT_SELECTED;
  }

  public selectPicture(winner: Winner): void {
    this.selectedPicture = winner === 1 ? this.picture1CssUrl : this.picture2CssUrl;
    this.isInSelectAnimation = true;
    this.matchService.choosePicture(winner).subscribe();

    setTimeout(() => {
      this.isInSelectAnimation = false;
    }, SELECT_ANIMATION_DURATION_MS);
  }

  private onNewGender(gender: Gender): void {
    if (gender === Gender.UNKNOWN) {
      this.modalService.open(GenderComponent, {
        backdrop: 'static',
        keyboard: false,
        centered: true,
      });
    }
  }

  private onNewPicture1Url(url: string | null): void {
    this.picture1CssUrl = url ?? '';
    this.selectedPicture = null;
  }

  private onNewPicture2Url(url: string | null): void {
    this.picture2CssUrl = url ?? '';
    this.selectedPicture = null;
  }
}
