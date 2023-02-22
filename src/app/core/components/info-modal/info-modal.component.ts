import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pks-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
})
export class InfoModalComponent {
  constructor(private activeModal: NgbActiveModal) {}

  public closeModal(): void {
    this.activeModal.close();
  }

  public dismissModal(): void {
    this.activeModal.dismiss();
  }
}
