import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  exports: [CommonModule, FormsModule, NgbModule, ReactiveFormsModule, TranslateModule],
})
export class SharedLibsModule {}
