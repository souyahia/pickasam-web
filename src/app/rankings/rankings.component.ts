import { Component, OnInit } from '@angular/core';
import { ResourceLoaderComponent } from 'app/core/components/resource-loader.component';
import { Gender } from 'app/models';
import { PictureUrlWithStats, RankingsService } from 'app/rankings/rankings.service';

@Component({
  selector: 'pks-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss'],
})
export class RankingsComponent extends ResourceLoaderComponent implements OnInit {
  public pictures: PictureUrlWithStats[] = [];
  public selectedGender: Gender | 'all' = 'all';

  constructor(private rankingsService: RankingsService) {
    super(rankingsService);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.fetchRankings();
  }

  public fetchRankings(): void {
    this.rankingsService.getAllRankings().subscribe((pictures) => this.onNewRankings(pictures));
  }

  public onGenderSelected(gender: Gender | 'all'): void {
    this.selectedGender = gender;
    this.sortPictures();
  }

  public getPictureScore(picture: PictureUrlWithStats): number {
    return picture.elo[this.selectedGender];
  }

  public getPictureWins(picture: PictureUrlWithStats): number {
    return picture.stats[this.selectedGender].wins;
  }

  public getPictureLosses(picture: PictureUrlWithStats): number {
    return picture.stats[this.selectedGender].losses;
  }

  private onNewRankings(pictures: PictureUrlWithStats[]): void {
    this.pictures = pictures;
    this.sortPictures();
  }

  private sortPictures(): void {
    this.pictures = this.pictures.sort(
      (p1, p2) => this.getPictureScore(p2) - this.getPictureScore(p1),
    );
  }
}
