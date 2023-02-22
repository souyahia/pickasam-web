import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GenderService } from 'app/gender/gender.service';
import { Gender } from 'app/models';

@Component({
  selector: 'pks-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.scss'],
})
export class GenderComponent {
  public GenderRef = Gender;

  constructor(private genderService: GenderService, private activeModal: NgbActiveModal) {}

  public selectGender(gender: Gender): void {
    this.genderService.setGender(gender);
    this.activeModal.close(gender);
  }
}
