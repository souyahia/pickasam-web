import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Gender } from 'app/models';

@Component({
  selector: 'pks-gender-switch',
  templateUrl: './gender-switch.component.html',
  styleUrls: ['./gender-switch.component.scss'],
})
export class GenderSwitchComponent {
  public readonly availableGenders: (Gender | 'all')[] = [
    'all',
    Gender.FEMALE,
    Gender.MALE,
    Gender.OTHER,
  ];

  @Input()
  public selectedGender: Gender | 'all' = 'all';

  @Output()
  public selected = new EventEmitter<Gender | 'all'>();

  public selectGender(gender: Gender | 'all'): void {
    this.selectedGender = gender;
    this.selected.emit(this.selectedGender);
  }

  public getLabel(gender: Gender | 'all'): string {
    return `rankings.gender.${gender}`;
  }

  isGenderSelected(gender: Gender | 'all'): boolean {
    return this.selectedGender === gender;
  }
}
