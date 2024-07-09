import { ChangeDetectorRef, Directive, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[tcShowAuth]', standalone: true,
})
export class ShowAuthDirective implements OnDestroy {
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef
  ) {
    this.updateView();
  }

  private updateView(): void {
    this.ngUnsubscribe$.next();
    this.authService.isAuthenticated()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(isAuth => {
        if (isAuth) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
        this.cdRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }
}
