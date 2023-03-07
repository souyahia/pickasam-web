import { Directive, OnInit } from '@angular/core';
import { OnDestroyComponent } from 'app/core/components/on-destroy.component';
import { ResourceLoaderService } from 'app/core/services/resource-loader.service';
import { takeUntil } from 'rxjs';

@Directive()
export abstract class ResourceLoaderComponent extends OnDestroyComponent implements OnInit {
  public isLoading = false;
  public isError = false;

  protected constructor(protected service: ResourceLoaderService) {
    super();
  }

  ngOnInit(): void {
    this.service
      .isLoading()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading) => this.updateLoading(isLoading));
    this.service
      .isError()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isError) => this.updateError(isError));
  }

  private updateLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  private updateError(isError: boolean): void {
    this.isError = isError;
  }
}
