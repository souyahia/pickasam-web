import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoModalComponent } from 'app/core/components/info-modal/info-modal.component';

@Component({
  selector: 'pks-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private modalService: NgbModal) {}

  public openInfoModal(): void {
    this.modalService.open(InfoModalComponent, {
      centered: true,
    });
  }
}
