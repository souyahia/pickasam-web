import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoModalComponent } from 'app/core/components/info-modal/info-modal.component';
import { filter } from 'rxjs';

const PAGE_TITLES = {
  '/rankings': 'navbar.titles.rankings',
};

@Component({
  selector: 'pks-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private readonly pageTitles = new Map<string, string>();
  public currentUrl = '/';

  constructor(private router: Router, private modalService: NgbModal) {
    this.pageTitles.set('/rankings', 'navbar.titles.rankings');
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => this.onNavigationEnd(event as NavigationEnd));
  }

  public openInfoModal(): void {
    this.modalService.open(InfoModalComponent, {
      centered: true,
    });
  }

  public isHomePage(): boolean {
    return this.currentUrl === '/';
  }

  public getPageTitle(): string {
    return this.pageTitles.get(this.currentUrl) ?? '';
  }

  private onNavigationEnd(event: NavigationEnd): void {
    this.currentUrl = event.url;
  }
}
